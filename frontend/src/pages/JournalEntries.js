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
import moment from "moment";

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
    if (isAuthenticated) {
      if (dateRange[0] !== null && dateRange[1] !== null) {
        let newEndRange = new Date(dateRange[1]);
        newEndRange.setDate(newEndRange.getDate() + 1);
        let newEntries = [];

        entries.map((entry) => {
          if (
            new Date(entry.created_at) >= new Date(dateRange[0]) &&
            new Date(entry.created_at) <= newEndRange
          ) {
            newEntries.push(entry);
          }
        });

        setEntries(newEntries);
      } else {
        readEntries(genericToken, user.email, setEntries);
      }
    }
  }, [dateRange]);

  return (
    <Container>
      {!isAuthenticated && <div> Not authenticated</div>}
      {isAuthenticated && (
        <React.Fragment>
          <Row>
            <Col className={"m-2 border-container"}>
              <AddEntryForm
                tokenGenerator={scopedToken}
                setEntries={setEntries}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            </Col>
            <Col xs={9} className={"m-2 border-container"}>
              <Row xs={12} className="m-4 text-center">
                <div>Select a date range to view entries for that period</div>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  className="date-picker"
                  isClearable={true}
                  placeholderText="All dates selected"
                />
              </Row>

              <Row xs={12} md={12} className="g-4 m-2">
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
