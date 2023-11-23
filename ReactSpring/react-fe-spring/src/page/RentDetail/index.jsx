import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const RentDetail = () => {
  const [rentData, setRentData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const handleStatusChange = (rentId, selectedValue) => {
    const updatedRentData = rentData.map((rent) => {
      if (rent.id === rentId) {
        return { ...rent, status: selectedValue };
      }
      return rent;
    });

    setRentData(updatedRentData);
    console.log(rentData);
  };

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split("/");
        const userIdFromUrl = urlParts[urlParts.length - 1];
        setUserId(userIdFromUrl);

        const response = await axios.get(`/admin/rentdetail/${userIdFromUrl}`);
        if (response.status !== 200) {
          throw new Error("Network response was not ok.");
        }

        setRentData(response.data); // Set the rent data state with the fetched data
      } catch (error) {
        setError(error.message || "Error fetching rent data.");
      }
    };

    fetchRentData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const saveRentStatuses = async () => {
    try {
      const response = await axios.put("/admin/saveRentStatus", rentData);

      // Handle success response
      console.log("Rent statuses updated successfully", response.data);
    } catch (error) {
      setError(error.message || "Error saving rent statuses.");
    }
  };

  return (
    <div>
      <Container>
        <h3>Chờ xác nhận</h3>
        {rentData.length > 0 ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter((rent) => rent.status === "PENDING")
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>
                        <Form.Select
                          value={rent.status}
                          onChange={(e) => {
                            handleStatusChange(rent.id, e.target.value);
                            console.log(e.target.value);
                          }}
                        >
                          <option value="PENDING">Chờ xác nhận</option>
                          <option value="RENTING">Đang thuê</option>
                          <option value="DONE">Hoàn thành</option>
                          {/* Add other status options as needed */}
                        </Form.Select>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Button onClick={saveRentStatuses}>Save</Button>
            <h3>Đang thuê</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter((rent) => rent.status === "RENTING")
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>
                        <Form.Select
                          value={rent.status}
                          onChange={(e) => {
                            handleStatusChange(rent.id, e.target.value);
                            console.log(e.target.value);
                          }}
                        >
                          <option value="PENDING">Chờ xác nhận</option>
                          <option value="RENTING">Đang thuê</option>
                          <option value="DONE">Hoàn thành</option>
                          {/* Add other status options as needed */}
                        </Form.Select>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h3>Hoàn thành</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Status</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {rentData
                  .filter((rent) => rent.status === "DONE")
                  .map((rent) => (
                    <tr key={rent.id}>
                      <td>{rent.id}</td>
                      <td>{rent.book.name}</td>
                      <td>{rent.book.id}</td>
                      <td>
                        <Form.Select
                          value={rent.status}
                          onChange={(e) => {
                            handleStatusChange(rent.id, e.target.value);
                            console.log(e.target.value);
                          }}
                        >
                          <option value="PENDING">Chờ xác nhận</option>
                          <option value="RENTING">Đang thuê</option>
                          <option value="DONE">Hoàn thành</option>
                          {/* Add other status options as needed */}
                        </Form.Select>
                      </td>
                      {/* Add other table cells for additional details */}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No rent data available</p>
        )}
      </Container>
    </div>
  );
};

export default RentDetail;
