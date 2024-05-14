const Customer = require('../models/customer');

const createCustomer = async (req, res) => {
    try {
        // const { name, address, customerName, team, projectStartDate } = req.body;
    
        const newCustomer = new Customer(req.body);
    
        const savedCustomer = await newCustomer.save();
    
        res.status(201).json({
            message: 'Created Customer successfully',
            data: {
                customer: savedCustomer
            }
        }); 
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getAllCUstomers = async (req, res) => {
  try {
      const customers = await Customer.find();

      res.json({
          message: 'Fetched all customers successfully',
          data: {
            count: customers.length,
            customers
          }
      }); 
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const deleteCustomer = async (req, res) => {
  try {
      const id = req?.params?.id;
      const deletedCustomer = await Customer.findByIdAndDelete(id);

      if (!deletedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}

const editCustomer = async (req, res) => {
  try {
      const id = req?.params?.id;

      const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({ message: 'Customer updated successfully', data: { customer: updatedCustomer } });
  } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
    createCustomer,
    getAllCUstomers,
    deleteCustomer,
    editCustomer
}

