import { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, [getMovieData, movieId]);

  const addReview = async (e) => {
    e.preventDefault();
    console.log('addReview function called'); // Debugging line
  
    const rev = revText.current.value;
  
    try {
      const response = await api.post("/api/v1/reviews", { reviewBody: rev, imdbId: movieId });
      console.log('API response:', response.data); // Debugging line
  
      const updatedReviews = [...reviews, { body: rev }];
      revText.current.value = "";
  
      setReviews(updatedReviews);
      setSubmitSuccess(true); // Indicate success
    } catch (err) {
      console.error('Error in API call:', err); // Debugging line
      setSubmitSuccess(false); // Indicate failure
    }
  };

  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
          {submitSuccess && ( // Conditionally render the success message
            <Row>
              <Col>
                <Alert variant="success">Review submitted successfully!</Alert>
              </Col>
            </Row>
          )}
          {reviews?.map((r, index) => (
            <div key={index}>
              <Row>
                <Col>{r.body}</Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
