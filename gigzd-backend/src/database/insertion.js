const { db } = require('./main')
const { getSpecificData } = require('./read')

exports.insert = async (table_name, values) => {
    try {
        switch (table_name) {
            case 'posted_jobs':
                query = `insert into posted_jobs (company_name, education, no_of_position, position, designation, package, stipend, door_no, street_name, city, pin_code, description,company_logo, min_age,max_age) values ('${values.company_name}', '${(values.education).toLowerCase()}', '${values.no_of_positions}', '${values.position}', '${(values.designation).toLowerCase()}', '${values.package}', '${values.stipend}', '${values.door_no}', '${values.street_name}', '${(values.city).toLowerCase()}', '${values.pincode}', '${values.description}', '${values.company_logo}', '${values.min_age}', '${values.max_age}');`
                break;
            case 'provider_register':
                query = `insert into provider_register (company_logo,contact_person,phone_number,company_name,gst_number,pan,bank_account_number,ifsc_code,company_address) values ('${values.company_logo}','${values.contact_person}','${values.phone_number}','${values.company_name}','${values.gst_number}','${values.pan}','${values.bank_account_number}','${values.ifsc_code}','${values.company_address}');`
                break;
            case 'user_table':
                query = `insert into user_table (user_name,education,course,profile_image) values ('${values.user_name}','${values.education}','${values.course}','${values.profile_image}');`
                break;
            case 'applied_jobs':
                query = `insert into applied_jobs (user_name,company_name, job_id) values ('${values.user_name}', '${values.company_name}', '${values.job_id}');`
                break;
            case 'application_status':
                query = `insert into application_status (user_name,status,date,job_id) values ('${values.user_name}', '${values.applicationStatus}', '${values.date?values.date:new Date().toJSON().split('T')[0]}','${values.jobId}');`
                break;
            default:
                break;
        }
        if (table_name === 'applied_jobs') {
            const existingUser = await getSpecificData('applied_jobs', `user_name = '${values.user_name}' and job_id = ${values.job_id}`)
            if (existingUser.length !== 0) return 0;
        }
        const result = db.query(query)
        return result;
    } catch (error) {
        console.log('error from insert query', error);
        return error;
    }
}
