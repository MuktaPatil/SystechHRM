const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "u172510268_systech",
  "u172510268_devs",
  "Ggwpfax@9990",
  {
    host: "srv1001.hstgr.io",
    dialect: "mysql",
    port: 3306,
  }
);

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sectorDetails: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
    allowNull: false,
  },
  natureOfBusiness: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN, // You can adjust the data type for the role as needed
  },
  createdBy: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
  createdOn: {
    type: DataTypes.DATE, // You can adjust the data type for the role as needed
  },
  modifiedBy: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
  modifiedOn: {
    type: DataTypes.DATE, // You can adjust the data type for the role as needed
  },
  logo: {
    type: DataTypes.BLOB, // You can adjust the data type for the role as needed
    allowNull: true,
  },
  logoName: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
  singleBranch: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("company masters table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating company masters table:", error);
  });

module.exports = Company;
