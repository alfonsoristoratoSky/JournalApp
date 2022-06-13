import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EntryCard from "../components/EntryCard";
import { readEntries } from "../utils/apiService";
// import { getConfig } from "../config";
import AddEntryForm from "../components/AddEntryForm";

const JournalEntries = () => {
  //   const { apiOrigin = "http://localhost:8080", audience } = getConfig();
  const { user, isAuthenticated } = useAuth0();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [entries, setEntries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const genericToken = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {}
  };
  const scopedToken = async (scope) => {
    try {
      return await getAccessTokenSilently({
        scope: scope,
      });
    } catch (error) {
      return await getAccessTokenWithPopup({
        scope: scope,
      });
    }
  };

  useEffect(() => {
    readEntries(genericToken, user.email, setEntries);
  }, []);

  return (
    <Container className="container-bg">
      {!isAuthenticated && <div> Not auth</div>}
      {isAuthenticated && (
        <React.Fragment>
          <Row>
            <Col>
              <AddEntryForm
                tokenGenerator={scopedToken}
                setEntries={setEntries}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            </Col>
            <Col xs={9}>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
              <Row xs={12} md={12} className="g-4">
                {entries.map((entry, index) => {
                  return (
                    <EntryCard
                      key={index}
                      entry={entry}
                      tokenGenerator={scopedToken}
                      setEntries={setEntries}
                      setEditMode={setEditMode}
                    />
                  );
                })}
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};
export default JournalEntries;
