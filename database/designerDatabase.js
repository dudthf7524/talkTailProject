const BusinessDesinger = require('../models/BusinessDesinger');

const getDesignerById = async (id) => {
    console.log("database desinger")
    console.log(id)
    try {
        const  desingerList = await BusinessDesinger.findAll({
            where: { business_registration_number : id },
            //attributes: {
                //exclude: ['business_registration_name', 'business_registration_number', 'business_owner']
            //}
        });
        console.log(desingerList)
        return desingerList;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch business details');
    }
};


module.exports = {
    getDesignerById,
};