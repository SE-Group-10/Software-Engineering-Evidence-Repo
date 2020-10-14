import React from "react";
import "./SearchFilters.css";
import { Form, Row, Container } from "react-bootstrap";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  SubMenu,
  MenuItem,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

class SearchFilters extends React.Component {
  render() {
    return (
      <ProSidebar>
        <SidebarHeader>
          <Menu>
            <SubMenu title="Search Filters:">
              <Row>
                <Form.Label>Research Method</Form.Label>
                <Form.Control as="select" style={{ width: '12vw'}}>
                <option value="0"> </option>
                  <option value="rmethod_case_study">Case Study</option>
                  <option value="rmethod_field_obs">Field Observation</option>
                  <option value="rmethod_experiment">Experiment</option>
                  <option value="rmethod_interview">Interview</option>
                  <option value="rmethod_survey">Survey</option>
                </Form.Control>
              </Row>
              <Row>
                <Form.Label>Research Participants</Form.Label>
                <Form.Group controlId="participants_form" style={{ width: '12vw'}}>

                  <Form.Check
                    required
                    type="radio"
                    label="Undergraduate Students"
                    name="participants"
                    value="user"
                    id="undergradStudents"
                    onChange={this.radioOnChangeHandler}
                  />
                  <Form.Check
                    required
                    type="radio"
                    label="Postgraduate Students"
                    name="participants"
                    value="analyst"
                    id="postgradStudents"
                    onChange={this.radioOnChangeHandler}
                  />
                  <Form.Check
                    required
                    type="radio"
                    label="Practitioners"
                    name="participants"
                    value="moderator"
                    id="moderator_radio"
                    onChange={this.radioOnChangeHandler}
                  />
                </Form.Group>
              </Row>
              <Row>
              <Form.Label>Evidence Item</Form.Label>
                <Form.Control as="select" style={{ width: '12vw'}}>
                <option value="0"> </option>
                  <option value="article_title">Outcome/Benefit</option>
                  <option value="article_name"> Context </option>
                  <option value="article_author">Result</option>
                </Form.Control>
              </Row>
              <Row>
              <Form.Label>SE Method</Form.Label>
                <Form.Control as="select" style={{ width: '12vw'}}>
                <option value="0"> </option>
                  <option value="article_title">TDD</option>
                  <option value="article_name">BDD</option>
                  <option value="pair_programming">Pair Programming</option>
                  <option value="planning_poker">Planning Poker</option>
                  <option value="daily_standups">Daily Standups</option>
                  <option value="story_boards">Story Boards</option>
                  <option value="us_mapping">User Story Mapping</option>
                  <option value="cont_integrations">Continuous Integrations</option>
                  <option value="retrospectives">Retrospectives</option>
                  <option value="bd_chart">Burn Down Charts</option>
                  <option value="req_prio">Requirements prioritisation</option>
                  <option value="version_ctrl">Version Control</option>
                  <option value="code_sharing">Code Sharing</option>
                </Form.Control>
              </Row>
              <Row>
              <Form.Label>SE Methodology</Form.Label>
                <Form.Control as="select" style={{ width: '12vw'}}>
                <option value="0"> </option>
                  <option value="Scrum">Scrum</option>
                  <option value="Waterfall">Waterfall</option>
                  <option value="Spiral">Spiral</option>
                  <option value="XP">XP</option>
                  <option value="Rational Unified Process"> Rational Unified Process</option>
                  <option value="Crystal"> Crystal</option>
                  <option value="Clean room">Clean room</option>
                  <option value="Feature Driven Development">Feature Driven Development</option>
                  <option value="Model Driven Development">Model Driven Development</option>
                  <option value="Formal methods">Formal methods</option>
                  <option value="Problem Driven Developmen">Problem Driven Development</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Service Oriented Development">Service Oriented Development</option>
                  <option value="Aspect Oriented Development">Aspect Oriented Development</option>
                  <option value="Domain Driven Development">Domain Driven Development</option>
                  <option value="Values Driven Development">Values Driven Development</option>
                  <option value="Product Driven Development">Product Driven Development</option>
                  <option value="Agile">Agile</option>
                </Form.Control>
              </Row>
              <Row>
              <Form.Label>Publication Details: </Form.Label>
                <Form.Group controlId="authorSearch">
                  <Form.Control type="text" placeholder="Author" />
                </Form.Group>
                <Form.Group controlId="titleSearch">
                  <Form.Control type="text" placeholder="Title" />
                </Form.Group>
                <Form.Group controlId="linkSearch">
                  <Form.Control type="text" placeholder="URL or DOI" />
                </Form.Group>
              </Row>
            </SubMenu>
          </Menu>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <SubMenu title="Sort Results By:">
              <MenuItem>User Ratings</MenuItem>  {/*TODO: Add fn to perform sort from high - low ratings */}
              <MenuItem> Reviews Quantity </MenuItem>  {/* TODO: Add fn to perform sort based on number of reviews.*/}
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    );
  }
}

export default SearchFilters;
