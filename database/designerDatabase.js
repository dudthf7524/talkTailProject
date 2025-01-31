const { BusinessDesinger } = require("../models");
const { DesingerCloseDay } = require("../models");



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


const DesignerDay = async (id, selectedDate) => {
    console.log("database desinger")
    console.log(selectedDate)
    console.log(id)
    try {
        const  desingerList = await DesingerCloseDay.create({
            business_desinger_id: id,
            desinger_close_day: selectedDate,
        });
        console.log(desingerList)
        return desingerList;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch business details');
    }
};

const DesignerDayList = async (id) => {
    console.log("database desinger")
    console.log(id)
    try {
        const  result = await DesingerCloseDay.findAll({
            where: { business_desinger_id : id },
            //attributes: {
                //exclude: ['business_registration_name', 'business_registration_number', 'business_owner']
            //}
        });
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch business details');
    }
};


module.exports = {
    getDesignerById,
    DesignerDay,
    DesignerDayList
};