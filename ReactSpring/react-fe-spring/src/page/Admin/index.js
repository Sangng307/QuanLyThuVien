import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../component/UserProvider";
import {
  Container,
  Table,
  Image,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [initialSelectedBook, setInitialSelectedBook] = useState({});
  const user = useUser();
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const updateBook = (prop, value) => {
    const updatedBook = { ...selectedBook };
    updatedBook[prop] = value;
    setSelectedBook(updatedBook);
  };
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when component mounts
    axios
      .get("/admin/categories")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [books]);

  useEffect(() => {
    axios
      .get("/api/book", { headers: { Authorization: `Bearer ${user.jwt}` } })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, [user]);
  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [books, searchTerm]);
  const handleEdit = () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("name", document.getElementById("formBookName").value);
    formData.append("category", selectedCategory);
    formData.append("author", document.getElementById("formBookAuthor").value);
    formData.append(
      "description",
      document.getElementById("formBookDescription").value
    );

    axios
      .put(`/admin/${selectedBook.id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Book updated:", response.data);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === selectedBook.id ? response.data : book
          )
        );

        // Update form fields with the values of the edited book
        document.getElementById("formBookName").value =
          initialSelectedBook.name;

        document.getElementById("formBookAuthor").value =
          initialSelectedBook.author;
        document.getElementById("formBookDescription").value =
          initialSelectedBook.description;

        // Clear the imageFile state to prevent it from retaining the previous value
        setImageFile(null);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("name", document.getElementById("formBookName").value);
    formData.append("category", selectedCategory);
    formData.append("author", document.getElementById("formBookAuthor").value);
    formData.append(
      "description",
      document.getElementById("formBookDescription").value
    );

    axios
      .post("/admin/create", formData, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Book created:", response.data);
        setBooks((prevBooks) => [...prevBooks, response.data]);
        // Clear form fields after creating a new book
        setSelectedBook({});
        setInitialSelectedBook({});
        setImageFile(null);
        document.getElementById("formBookName").value = "";
        document.getElementById("formBookCategory").value = "";
        document.getElementById("formBookAuthor").value = "";
        document.getElementById("formBookDescription").value = "";
      })
      .catch((error) => {
        console.error("Error creating book:", error);
        console.log(selectedCategory);
      });
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleReset = () => {
    // Clear the selectedBook state
    setSelectedBook({});
    setInitialSelectedBook({});
    // Reset the image file state
    setImageFile(null);
    // Reset input fields
    document.getElementById("formBookName").value = "";
    setSelectedCategory("");
    document.getElementById("formBookAuthor").value = "";
    document.getElementById("formBookDescription").value = "";
  };

  const pagesToShow = 3;
  const booksPerPage = 10;
  const lastPage = Math.ceil(books.length / booksPerPage);

  let startPage, endPage;
  if (lastPage <= pagesToShow) {
    startPage = 1;
    endPage = lastPage;
  } else {
    if (currentPage <= Math.ceil(pagesToShow / 2)) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + Math.floor(pagesToShow / 2) >= lastPage) {
      startPage = lastPage - pagesToShow + 1;
      endPage = lastPage;
    } else {
      startPage = currentPage - Math.floor(pagesToShow / 2);
      endPage = currentPage + Math.floor(pagesToShow / 2);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        // Optionally, reset the selectedBook state and input fields
        setSelectedBook({});
        setInitialSelectedBook({});
        setImageFile(null);
        document.getElementById("formBookName").value = "";
        document.getElementById("formBookCategory").value = "";
        document.getElementById("formBookAuthor").value = "";
        document.getElementById("formBookDescription").value = "";
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Image
            src={selectedBook ? `${selectedBook.image}` : ""}
            alt=""
            thumbnail
            style={{ maxWidth: "auto", maxHeight: "400px" }}
          />
        </Col>
        <Col xs={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBookName">
              <Form.Label>Tên Sách</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sách"
                defaultValue={
                  initialSelectedBook ? initialSelectedBook.name : ""
                }
                onChange={(e) => updateBook("name", e.target.value)}
              />
            </Form.Group>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                console.log(e.target.value); // Log the selected value separately
              }}
            >
              <option value="">Chọn thể loại</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}{" "}
                  {/* Use the property representing the category name */}
                </option>
              ))}
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBookAuthor">
              <Form.Label>Tác Giả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tác giả sách"
                defaultValue={
                  initialSelectedBook ? initialSelectedBook.author : ""
                }
                onChange={(e) => updateBook("author", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBookDescription">
              <Form.Label>Mô Tả Sách</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập mô tả sách"
                defaultValue={
                  initialSelectedBook ? initialSelectedBook.description : ""
                }
                onChange={(e) => updateBook("description", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Hình Ảnh Sách (Tải Lên Tệp)</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button onClick={handleCreate}>Create</Button>
            <Button variant="primary" type="button" onClick={handleEdit}>
              Update
            </Button>
            <Button variant="primary" type="button" onClick={handleReset}>
              Resest
            </Button>
            <Form.Group controlId="formSearch" className="mb-3">
              <Form.Label>Sreach</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên hoặc thể loại sách để tìm kiếm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Table>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Thể Loại</th>
            <th>Tác Giả</th>
            <th>Hình Ảnh</th>
            <th>Mô Tả</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks
            .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
            .map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.category.name}</td>
                <td>{book.author}</td>
                <td>
                  <Image
                    src={book.image}
                    alt=""
                    thumbnail
                    style={{ maxWidth: "auto", maxHeight: "50px" }}
                  />
                </td>
                <td>{book.description}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSelectedBook(book);
                      setInitialSelectedBook(book);
                      setSelectedCategory(book.category.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(book.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <ul className="pagination d-flex justify-content-center">
        <li className="page-item">
          <button className="page-link" type="button" onClick={prevPage}>
            Previous
          </button>
        </li>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li
            key={startPage + index}
            className={`page-item ${
              currentPage === startPage + index ? "active" : ""
            }`}
          >
            <button
              className={`page-link ${
                currentPage === startPage + index ? "active" : ""
              }`}
              type="button"
              onClick={() => paginate(startPage + index)}
            >
              {startPage + index}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" type="button" onClick={nextPage}>
            Next
          </button>
        </li>
      </ul>
    </Container>
  );
};

export default Admin;
