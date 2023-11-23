import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Homepage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/book")
      .then((response) => {
        setBooks(response.data.slice(0, 12));
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    animateOut: "sildeOutUp",
    nav: false,
    dots: false,
    margin: 0,
    responsive: {
      1000: {
        items: 4,
      },
      600: {
        items: 3,
      },
      400: {
        items: 1,
      },
    },
  };

  return (
    <div>
      <div style={{ maxWidth: "100%", height: "auto" }}>
        <Image
          src="https://glib.hcmus.edu.vn/sites/default/files/inline-images/B%E1%BA%A2N%20IN%20BANNER%20H%C3%80NH%20TRANG%20TRI%20TH%E1%BB%A8C.jpg"
          alt=""
          fluid // Use fluid prop for responsive images
        />
      </div>
      <Container className="mt-4">
        <div style={{ backgroundColor: "#fee2e6" }}>
          <h3>Kinh dị</h3>
          {books.length > 0 && (
            <OwlCarousel className="owl-theme" {...options} nav>
              {books.map(
                (bookItem) =>
                  bookItem.category.name.toUpperCase() === "KINH DỊ" && (
                    <div
                      key={bookItem.id}
                      style={{ margin: "5px", padding: "5px" }}
                    >
                      <Card style={{ width: "100%" }}>
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
                        </Card.Body>
                      </Card>
                    </div>
                  )
              )}
            </OwlCarousel>
          )}
        </div>

        <div className="mt-4" style={{ backgroundColor: "#fee2e6" }}>
          <h3>Trinh thám</h3>
          {books.length > 0 && (
            <OwlCarousel className="owl-theme" {...options} nav>
              {books.map(
                (bookItem) =>
                  bookItem.category.name.toUpperCase() === "TRINH THÁM" && (
                    <div
                      key={bookItem.id}
                      style={{ margin: "5px", padding: "5px" }}
                    >
                      <Card style={{ width: "100%" }}>
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
                        </Card.Body>
                      </Card>
                    </div>
                  )
              )}
            </OwlCarousel>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
