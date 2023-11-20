import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";

const Book = () => {
  const [book, setBook] = useState(null);
  const [originalBook, setOriginalBook] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterByAuthor, setFilterByAuthor] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 12;
  const user = useUser();

  const handleAddToCart = (selectedBook) => {
    axios
      .post("/user/addcart", selectedBook, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log("Book added to cart:", response.data);
      })
      .catch((error) => {
        alert("Bạn chỉ có thể thuê 3 quyển sách");
        console.error("Error adding book to cart:", error);
      });
  };

  useEffect(() => {
    axios
      .get("/api/book", {})
      .then((response) => {
        setBook(response.data);
        console.log(response.data);
        setOriginalBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, [user.jwt]);

  const handleSort = (sortOrder) => {
    if (sortOrder === "asc") {
      const sortedAsc = [...currentBooks].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      setBook(sortedAsc);
    } else if (sortOrder === "desc") {
      const sortedDesc = [...currentBooks].sort((a, b) =>
        a.name < b.name ? 1 : -1
      );
      setBook(sortedDesc);
    }
  };

  const handleCategoryFilter = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleAuthorFilter = (author) => {
    setFilterByAuthor(true);
    setSelectedAuthor(author);
  };

  const handleShowAll = () => {
    setFilterByAuthor(false);
    setSelectedAuthor("");
    setSelectedCategories([]);
    setBook(originalBook); // Reset to the original book data
    setCurrentPage(0); // Reset pagination
  };

  const filteredBooks = book
    ? filterByAuthor
      ? book.filter((item) => item.author === selectedAuthor)
      : selectedCategories.length
      ? book.filter((item) => selectedCategories.includes(item.category.name))
      : book
    : [];

  const offset = currentPage * booksPerPage;
  const currentBooks = book
    ? filteredBooks.slice(offset, offset + booksPerPage)
    : [];

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div style={{ margin: "2em" }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            padding: "0 1em",
            borderRight: "1px solid #ddd",
          }}
        >
          <h2>Filter</h2>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              border: "1px solid #ddd",
              background: "#f8f9fa",
            }}
          >
            <li>
              <h2
                onClick={() => {
                  setShowAuthors(!showAuthors);
                  setShowCategories(false);
                }}
                style={{
                  color: showAuthors ? "blue" : "inherit",
                  fontWeight: showAuthors ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                Authors
              </h2>
              {showAuthors &&
                Array.from(new Set(book.map((item) => item.author))).map(
                  (author, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="radio"
                          checked={selectedAuthor === author}
                          onChange={() => handleAuthorFilter(author)}
                        />{" "}
                        {author}
                      </label>
                    </div>
                  )
                )}
            </li>
            <li>
              <h2
                onClick={() => {
                  setShowCategories(!showCategories);
                  setShowAuthors(false);
                }}
                style={{
                  color: showCategories ? "blue" : "inherit",
                  fontWeight: showCategories ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                Categories
              </h2>
              {showCategories &&
                Array.from(new Set(book.map((item) => item.category.name))).map(
                  (categoryName, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(categoryName)}
                          onChange={() => handleCategoryFilter(categoryName)}
                        />{" "}
                        {categoryName}
                      </label>
                    </div>
                  )
                )}
            </li>
          </ul>
        </div>
        <div style={{ flex: 4, padding: "0 1em" }}>
          <div style={{ display: "flex", marginBottom: "1em" }}>
            <Button
              style={{
                marginRight: "1em",
                backgroundColor: "#FFB6C1",
                color: "white",
                border: "none",
                padding: "0.5em 1em",
                borderRadius: "5px",
              }}
              onClick={handleShowAll}
            >
              Show All
            </Button>
            <Button
              style={{
                marginRight: "1em",
                backgroundColor: "#FFB6C1",
                color: "white",
                border: "none",
                padding: "0.5em 1em",
                borderRadius: "5px",
              }}
              onClick={() => handleSort("asc")}
            >
              A-Z
            </Button>
            <Button
              style={{
                backgroundColor: "#FFB6C1",
                color: "white",
                border: "none",
                padding: "0.5em 1em",
                borderRadius: "5px",
              }}
              onClick={() => handleSort("desc")}
            >
              Z-A
            </Button>
          </div>
          {currentBooks.length > 0 ? (
            <Container>
              <Row xs={1} md={2} lg={4} className="g-4 mt-3">
                {currentBooks.map((bookItem) => (
                  <Col key={bookItem.id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Body
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "200px",
                        }}
                      >
                        <Link
                          to={`/book/${bookItem.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src={`${bookItem.image}`}
                            alt="Book Cover"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                          <Card.Title style={{ flex: 1 }}>
                            {bookItem.name}
                          </Card.Title>
                        </Link>
                        <Card.Subtitle
                          className="mb-2 text-muted"
                          style={{ flex: 1 }}
                        >
                          {bookItem.author}
                        </Card.Subtitle>
                        <div style={{ flex: 1 }}>
                          <p>
                            <b>Category:</b> {bookItem.category.name}
                          </p>
                          <p>
                            <b>Description:</b> {bookItem.description}
                          </p>
                        </div>
                        {user.jwt && (
                          <div className="d-flex justify-content-end">
                            <Button
                              variant="primary"
                              style={{ width: "48%" }}
                              onClick={() => handleAddToCart(bookItem)}
                            >
                              <FontAwesomeIcon icon={faShoppingCart} />
                              Add Cart
                            </Button>
                            <Button
                              variant="secondary"
                              style={{ width: "48%" }}
                              onClick={() => console.log("a")}
                            >
                              <FontAwesomeIcon icon={faStar} />
                            </Button>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="pagination-container">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                />
              </div>
            </Container>
          ) : (
            <p>No books found with the selected categories</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
