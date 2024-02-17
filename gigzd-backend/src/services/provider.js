const { getSpecificData, getAllData } = require('../database/read')
const { insert } = require('../database/insertion')
const { updateData } = require('../database/updation')
const { resolver } = require('.././helpers/queryExecuter')
const { decode } = require('../helpers/decode')


exports.getUserData = async (companyName) => {
    try {
        let userData = await getSpecificData('provider_register', `company_name = '${companyName}'`)
        if (userData.length === 0) {
            const query = `select * from users where first_name='${companyName}';`;
            userData = await resolver(query)
            userData.newUser = true;
            return [userData];
        }
        userData[0].newUser = false;
        return userData;
    } catch (error) {
        console.log("Error from provider Get user", error);
        return error;
    }
}

exports.addCompanyData = async (data) => {
    try {
        if (!data.company_logo) data.company_logo = '';
        return await insert('provider_register', data)
    } catch (error) {
        console.log('Error From Add Company Data: ', error)
        return error;
    }
}

exports.addJobPost = async (data) => {
    try {
        const result = await getAllData('provider_register', `company_name = '${data.company_name}'`, '', 'company_logo')
        const logo = result.length > 0 ? { ...result[0] } : { company_logo: '' };
        return await insert('posted_jobs', { ...logo, ...data })
    } catch (error) {
        console.log('Error From Add Jobs: ', error)
        return error;
    }
}


exports.getJobPost = async (data) => {
    try {
        return await getAllData('posted_jobs', `company_name = '${data.companyName}' and is_active = true`)
    } catch (error) {
        console.log('Error From Getting Jobs Posted: ', error)
        return error;
    }
}


exports.getApplicantData = async (jobId) => {
    try {
        const user_data = await getAllData('user_table', `job_id = '${jobId}' and is_seen = false`, 'inner join applied_jobs on user_table.user_name = applied_jobs.user_name')
        if (user_data.length === 0) return [];
        const company_info = await getAllData('provider_register', `company_name = '${user_data[0].company_name}'`, '', 'is_premium')
        let responseData = [];
        if (company_info[0].is_premium) {
            const length = user_data.length;
            for (let i = 0; i < length; i++) {
                const query = `select * from providers where concat(first_name,last_name) = '${user_data[i].user_name}'`
                const user_info = await resolver(query);
                const user_email = user_info.mail ? await decode(user_info.mail) : null;
                const user_phone_number = user_info.phone_number ? await decode(user_info.phone_number) : null;
                responseData.push({
                    user_name: user_data[i].user_name,
                    phone_number: user_phone_number,
                    mail_id: user_email,
                })
            }
            return responseData;
        }
        responseData = user_data.map(user_response_data => {
            const result = {
                user_name: user_response_data.user_name,
                phone_number: 'XXXXXXXXXX',
                mail_id: 'XXXXXXXXXX@XXXXX',

            }
            return result;
        });
        return responseData;
    } catch (error) {
        console.log('Error From Getting Jobs Applicant Status: ', error)
        return error;
    }

}

exports.addApplicationStatus= async(insertData)=>{
    try {
        await insert('application_status',insertData)
        await updateData('applied_jobs',`set is_seen = true`,`job_id = ${insertData.jobId} and user_name = '${insertData.user_name}'`)
        return
    } catch (error) {
        console.log('Error From posting Jobs Applicant Status: ', error)
        return error;
    }
}

exports.updateProfile = async (data) => {
    try {
        let query = 'set updated_on = now()';
        if (data.bank_account_number) query += `,bank_account_number = '${data.bank_account_number}' `
        if (data.ifsc_code) query += `,ifsc_code = '${data.ifsc_code}' `
        return await updateData('provider_register', query, `company_name = '${data.companyName}'`);
    } catch (error) {
        console.log("Error from Provider Update Profile: ", error);
        return error;
    }
}
exports.deleteJob = async (id) => {
    try {
        return await updateData('posted_jobs', `set is_active = false`, `id = ${id}`)
    } catch (error) {
        console.log('Error Deleting Posted Job: ', error)
        return error;
    }
}