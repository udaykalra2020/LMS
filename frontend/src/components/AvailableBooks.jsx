import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";

const AvailableBooks = () => {
  const { token } = useContext(AppContext);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    bookName: "",
    authorName: "",
    sectionName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/book/ebooks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
        setFilteredBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [token]);

  useEffect(() => {
    const { bookName, authorName, sectionName } = searchCriteria;
    const filtered = books.filter(
      (book) =>
        (bookName === "" ||
          book.name.toLowerCase().includes(bookName.toLowerCase())) &&
        (authorName === "" ||
          book.authors.some((author) =>
            author.toLowerCase().includes(authorName.toLowerCase())
          )) &&
        (sectionName === "" ||
          book.section?.name.toLowerCase().includes(sectionName.toLowerCase()))
    );
    setFilteredBooks(filtered);
  }, [searchCriteria, books]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClearSearch = (field) => {
    setSearchCriteria((prevState) => ({ ...prevState, [field]: "" }));
  };

  const requestBook = async (bookId) => {
    try {
      const res = await axios.post(
        `http://localhost:5001/api/book/ebooks/${bookId}/request`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Book requested successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Error requesting book";

      if (err.response.status === 403) {
        navigate("/subscription");
        toast.error(
          "Please upgrade your subscription. You have exceeded your plan limit to request books"
        );
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Container sx={{ paddingTop: 5 }}>
      {books.length > 0 ? (
        <>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Search Book Name"
                name="bookName"
                value={searchCriteria.bookName}
                onChange={handleSearchChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchCriteria.bookName && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClearSearch("bookName")}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "20px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Search Author Name"
                name="authorName"
                value={searchCriteria.authorName}
                onChange={handleSearchChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchCriteria.authorName && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClearSearch("authorName")}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "20px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Search Section Name"
                name="sectionName"
                value={searchCriteria.sectionName}
                onChange={handleSearchChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchCriteria.sectionName && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClearSearch("sectionName")}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "20px" },
                }}
              />
            </Grid>
          </Grid>
          <TableContainer
            component={Paper}
            sx={{ border: "1px solid #ccc", marginTop: 2, marginBottom: 10 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>SNo.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Book Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Book Cover</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBooks.map((book,index) => (
                  <TableRow key={book._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>
                  <Avatar
    alt="Book Cover"
    src={`http://localhost:5001/public/${book.cover_path}`}
    variant="square" // Makes it a square/rectangle
    sx={{
      width: 80,
      height: 95,
      
      objectFit: "cover", // Ensures the image fills the rectangle without distortion
    }}
  />
                  </TableCell>
                    <TableCell>{book.authors.join(", ")}</TableCell>
                    <TableCell>{book.section?.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => requestBook(book._id)}
                      >
                        Request
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography
          color="textSecondary"
          variant="h6"
          component="p"
          gutterBottom
        >
          No eBooks available.
        </Typography>
      )}
    </Container>
  );
};

export default AvailableBooks;
