const { getAllData } = require('../database/read')
const nodemailer = require('nodemailer');
const json2xls = require('json2xls');
const fs = require('fs')
const { resolver } = require('./queryExecuter')
const { decode } = require('./decode')

exports.triggerMail = async () => {
    try {
        if (process.env.trigger_mail === 'false') return;
        const applied_jobs_id = await getAllData('applied_jobs', '', '', 'distinct (job_id)')

        for (let i = 0; i < applied_jobs_id.length; i++) {
            const user_application_detail = await getAllData('posted_jobs', `job_id = ${applied_jobs_id[i].job_id}`, 'inner join applied_jobs on posted_jobs.id = applied_jobs.job_id')
            let user_details_to_mail = [];
            for (let j = 0; j < user_application_detail.length; j++) {
                const user_data_from_mysql = await resolver(`select * from providers where concat(first_name,last_name) = '${user_application_detail[j].user_name}'`);
                if (user_data_from_mysql.length === 0) {
                    user_details_to_mail.push({ user_name: user_application_detail[j].user_name, user_email: '-', user_phone_number: '-' })
                    continue;
                };
                const user_email = await decode(user_data_from_mysql.mail)
                const user_phone_number = await decode(user_data_from_mysql.phone_number)
                user_details_to_mail.push({ user_name: user_data_from_mysql.name, user_email, user_phone_number })
            }

            //converts json to excel
            const xls = await json2xls(user_details_to_mail);
            fs.writeFileSync(`${process.env.EXCEL_PATH}/candidate_list_${user_application_detail[0].designation}_${new Date().toJSON().split('T')[0]}.xlsx`, xls, 'binary');

            // mailing part
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: process.env.from_address,
                    pass: process.env.password,
                },
                from: process.env.from_address
            });
            await transporter.sendMail({
                from: `"${process.env.sender_name}" < '${process.env.from_address}' > `, // sender address
                to: [process.env.to_address],//list of receivers
                subject: `List of Candidates  for the Job Role - ${(user_application_detail[0].designation).toUpperCase()} - ${new Date().toLocaleString().split(',')[0]}`, // 
                html: `<div><h3>Dear ${user_application_detail[0].company_name},</h3><p>We are writing to provide you with the list of candidates who have applied for the job role of " ${(user_application_detail[0].designation).toUpperCase()} " as of ${new Date().toLocaleString().split(',')[0]}. Please find the attached file containing the comprehensive list of applicants.</p> <p>Regards,<br/><span>Gogig.</span> </p></div>`, // html body
                attachments: {
                    filename: 'file.xlsx',
                    path: `${process.env.EXCEL_PATH}/candidate_list_${user_application_detail[0].designation}_${new Date().toJSON().split('T')[0]}.xlsx`
                }
            }).then(info => {
                console.log("info : ", info);
                return info.messageId;
            }).catch(error => {
                return error;
            });
        }
        console.log(`Mail triggered on ${new Date().toLocaleString()}`);
        return
    } catch (error) {
        return error;
    }
}