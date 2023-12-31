import { Icon } from '@iconify/react'
import React from 'react'
import { Button } from "react-bootstrap";


const CompMaster = () => {
    const compData = [
        {
          ID: 1,
          Name: "Systech Solutions Pvt. Ltd",
          ShortName: "SYS",
          SectorDetails: "Automation",
          NatureOfBusiness: "Electrical Automission",
          Status: "Active",
          CreatedBy: "User123",
          CreatedOn: "2023-08-15",
          ModifiedBy: "User123",
        },
        {
          ID: 2,
          Name: "5S Innovations LLP",
          ShortName: "5SL",
          SectorDetails: "Information Technology",
          NatureOfBusiness: "B2B",
          Status: "Active",
          CreatedBy: "User456",
          CreatedOn: "2023-08-15",
          ModifiedBy: "User456",
        },
        {
          ID: 3,
          Name: "Healtech",
          ShortName: "HLT",
          SectorDetails: "Healthcare",
          NatureOfBusiness: "Software Service",
          Status: "Active",
          CreatedBy: "User789",
          CreatedOn: "2023-08-14",
          ModifiedBy: "User789",
        },
        {
          ID: 4,
          Name: "Company D",
          ShortName: "Co. D",
          SectorDetails: "Retail",
          NatureOfBusiness: "E-commerce",
          Status: "Active",
          CreatedBy: "User123",
          CreatedOn: "2023-08-14",
          ModifiedBy: "User123",
        },
        {
          ID: 5,
          Name: "Company E",
          ShortName: "Co. E",
          SectorDetails: "Manufacturing",
          NatureOfBusiness: "Automobiles",
          Status: "Active",
          CreatedBy: "User456",
          CreatedOn: "2023-08-13",
          ModifiedBy: "User456",
        },
      ];
    
      
    return (
  <div className='p-8'>
  <div className='bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg'>
    Company Master
  </div>
  <div className='flex justify-between items-center mt-4'>
    <div className='flex gap-4'>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        Copy
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        CSV
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        Excel
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        PDF
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        Print
      </button>
    </div>
    <button className='bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20'>
      Add Company 
    </button>
  </div>

            <div className='grid gap-4'>
            <div className='my-8 rounded-2xl bg-white p-4 pr-12'>

                <table className='min-w-full text-center'>
                    <thead className='border-b-2'>
                        <tr>
                            <th className='p-4 font-semibold text-black'>Actions</th>
                            <th className='p-4 font-semibold text-black'>Company ID</th>
                            <th className='p-4 font-semibold text-black'>Company Name</th>
                            <th className='p-4 font-semibold text-black'>ShortName</th>
                            <th className='p-4 font-semibold text-black'>Sector Details</th>
                            <th className='p-4 font-semibold text-black'>Nature of Business</th>
                            <th className='p-4 font-semibold text-black'>Status</th>
                            <th className='p-4 font-semibold text-black'>Created by</th>
                            <th className='p-4 font-semibold text-black'>Created on</th>
                            <th className='p-4 font-semibold text-black'>Modified by</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {compData.map((entry, index) => (
                            <tr key={index}>
                                <td>
                                <div className="flex items-center gap-2">
                                    <Icon icon="lucide:eye" color="#556987" width="27" height="27" />
                                    <Icon icon="mdi:edit" color="#556987" width="27" height="27"/>
                                    <Icon icon="material-symbols:delete-outline" color="#556987" width="27" height="27" />
                                    </div>
                                </td>
                                <td className='p-4'>{entry.ID}</td>
                                <td className='p-4'>{entry.Name}</td>
                                <td className='p-4'>{entry.ShortName}</td>
                                <td className='p-4'>{entry.SectorDetails}</td>
                                <td className='p-4'>{entry.NatureOfBusiness}</td>
                                <td className='p-4'>{entry.Status}</td>
                                <td className='p-4'>{entry.CreatedBy}</td>
                                <td className='p-4'>{entry.CreatedOn}</td>
                                <td className='p-4'>{entry.ModifiedBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default CompMaster