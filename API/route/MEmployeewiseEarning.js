const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Configure Sequelize with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

const MEmployeewiseEarning = sequelize.define(
  "MEmployeewiseEarning",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    EmployeeId: {
      type: DataTypes.INTEGER(7),
      allowNull: false,
    },
    EmployeewiseEarningId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeewiseEarningDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    EarningHeadId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EarningHead: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ECalculationType: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    ECalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    Formula: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

MEmployeewiseEarning.sync()
  .then(() => {
    console.log("MEmployeewiseEarning model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MEmployeewiseEarning model:", error);
  });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const EmployeewiseEarning = await MEmployeewiseEarning.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeewiseEarningId", "ASC"]],
    });
    res.json(EmployeewiseEarning);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  try {
    const EmployeewiseEarning = await MEmployeewiseEarning.findAll({
      where: {
        EmployeeId: EmployeeId,
      },
      attributes: {
        exclude: ["IUFlag", "id"],
      }
    });
    res.json(EmployeewiseEarning);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateEmployeewiseEarningId = async (req, res, next) => {
  console.log("Request body:", req.body);
  try {
    const employeeType = req.body[0]?.EmployeeType || "X"; // Use the EmployeeType from the first item in the array
    const totalRecords = await MEmployeewiseEarning.count();

    req.body.forEach((item, index) => {
      const newId = (totalRecords + index + 1).toString().padStart(4, "0");
      item.EmployeewiseEarningId = `${employeeType}${newId}`;
    });

    next();
  } catch (error) {
    console.error("Error generating EmployeeWiseEarningId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateEmployeewiseEarningId,
  authToken,
  async (req, res) => {
    const employeewiseEarning = req.body;
    const employeewiseEarningIds = employeewiseEarning.map(
      (item) => item.EmployeewiseEarningId
    );

    try {
      if (employeewiseEarning.some((item) => item.IUFlag === "D")) {
        // "Soft-delete" operation
        const result = await MEmployeewiseEarning.update(
          { AcFlag: "N" },
          { where: { EmployeewiseEarningId: employeewiseEarningIds } }
        );

        res.json({
          message: result[0]
            ? "Record(s) Deleted Successfully"
            : "Record(s) Not Found",
        });
      } else {
        const results = await Promise.all(
          employeewiseEarning.map(async (item) => {
            const result = await MEmployeewiseEarning.upsert(item, {
              updateOnDuplicate: true,
            });

            return result;
          })
        );

        res.json({
          message: results ? "Operation successful" : "Operation failed",
        });
      }
    } catch (error) {
      console.error("Error performing operation:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing Sequelize connection...");
  sequelize.close().then(() => {
    console.log("Sequelize connection closed. Exiting...");
    process.exit(0);
  });
});

module.exports = router;
