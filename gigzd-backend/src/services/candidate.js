const { getAllData } = require('../database/read')
const { insert } = require('../database/insertion')

exports.getJopPosted = async (table_name, userName, filter) => {
    const select_option = 'pj.*';
    let where_query = `pj.id not in (select aj.job_id from applied_jobs aj where user_name = '${userName}') `
    if (filter) {
        filter.map(filter => {
            const filterArr = filter.split(':');
            let filter_key = filterArr[0];
            if (filterArr[0] === 'age') {
                filter_key = filterArr[1][0] === '>' ? 'CAST(max_age AS INTEGER)' : 'CAST(min_age AS INTEGER)';
            }
            // if (filterArr[0] === 'package') filter_key = 'CAST(package AS INTEGER)';
            const filter_value = filterArr[1].substring(1);
            where_query += filterArr[0] === 'city' ? `and city ILIKE '%${filterArr[1].substring(1)}%'` : `and ${filter_key} ${filterArr[1][0]} '${filter_value}' `
        })
    }
    const filter_data = await getAllData(`${table_name} pj`, where_query, '', select_option);
    return filter_data;
}

exports.getUserDetail = async (table_name, userName) => {
    return await getAllData(table_name, `user_name = '${userName}'`)
}

exports.getSearchSuggestion = async (searchString) => {
    try {
        return await getAllData('posted_jobs', `designation ILIKE '%${searchString}%' or company_name ILIKE '%${searchString}%'`)
    } catch (error) {
        return error;
    }
}

exports.addUserDetail = async (data) => {
    try {
        return await insert('user_table', data)
    } catch (error) {
        return error;
    }
}
exports.applyJob = async (data) => {
    try {
        return await insert('applied_jobs', data)
    } catch (error) {
        return error;
    }
}
exports.getJobsNotApplied = async (userName) => {
    try {
        const result = await getAllData('applied_jobs', `user_name = '${userName}'`)
        if (result.length === 0) return await getAllData('posted_jobs')
        return await getAllData('posted_jobs', `applied_jobs.user_name = '${userName}'`, `left join applied_jobs on posted_jobs.id != applied_jobs.job_id `)
    } catch (error) {
        return error;
    }
}
exports.getUserHistory = async (userName) => {
    try {
        const data =  await getAllData('applied_jobs', `user_name = '${userName}'`, `JOIN posted_jobs on applied_jobs.job_id = posted_jobs.id`)
        for (let i = 0; i < data.length; i++) {
            const application_status = await getAllData('application_status',`job_id = ${data[i].job_id} and user_name = '${data[i].user_name}'`)
            data[i].application_status = {status:'Pending',report_date:'Pending'};
            if(application_status.length>0){
                let next_date = new Date(application_status[0].date)
                next_date.setDate(next_date.getDate()+1)
                data[i].application_status = {status:application_status[0].status,report_date:application_status[0].status !== 'rejected'?next_date:''};
            }
        }
        return data;
    } catch (error) {
        return error;
    }
}