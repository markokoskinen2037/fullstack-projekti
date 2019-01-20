import React, { Fragment } from "react";
import courseService from "../services/courses";
import userService from "../services/users";
import goalService from "../services/goals";

import { Input, FormControl, InputLabel, Select } from "@material-ui/core/";

import { Link } from "react-router-dom";

import {
  ListItem,
  ListItemText,
  Paper,
  Button,
  Grid,
  Typography,
  Tooltip
} from "@material-ui/core/";
import DifficultyDisplay from "./DifficultyDisplay";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalTarget: 5,
      goalDifficulty: "Helppo",
      goalExists: false,
      isActive: false,
      courseMedian: undefined,
      goals: undefined
    };
  }

  handleEnter = e => {
    if (e.which === 13) {
      alert("todo");
    }
  };

  deleteCourse = async course_id => {
    console.log("Deleting course from database...");

    if (
      this.props.user._id === this.props.course.user ||
      this.props.user._id === this.props.course.user._id
    ) {
      //Matchaa, sallitaan poisto
      //Poistetaan kurssi tietokannasta
      courseService.removeById(course_id, this.props.user._id);
      //TODO Poista kurssi statesta
      this.props.removeCourseFromCourseListState(course_id);
      console.log("removal completed");
      //reloadCoursesFromBackend() //Tää pitää korjata lokaalilla staten manipulaatiolla
    } else {
      this.props.showAlert("Sinulla ei oikeuksia poistaa tätä kurssia!");
      //alert(this.props.user._id + "   " + this.props.course.user._id)
    }
  };

  toggleActive = async course_id => {
    if (
      this.props.user.activeCourses.find(course => course._id === course_id)
    ) {
      //Jos aktivoitava kurssi on listalla
      console.log("deactivating...");

      var newList = this.props.user.activeCourses.filter(
        course => course._id !== course_id
      ); //Poistetaan kurssi aktiivisten listasta
      this.props.user.activeCourses = newList;
    } else {
      //Jos aktivoitava kurssi ei ole listalla
      console.log("activating...");

      this.props.user.activeCourses = this.props.user.activeCourses.concat(
        this.props.course
      ); //Lisätään aktivoitava kurssi listalle
    }

    let uusiAktiivistenKurssienLista = {
      activeCourses: this.props.user.activeCourses
    };

    let temp = !this.isActive;
    this.setState({ isActive: temp });

    await userService.update(this.props.user._id, uusiAktiivistenKurssienLista);

    const populatedUser = await userService.get(this.props.user._id);

    this.props.updateUserState(populatedUser);
  };

  createNewGoal = async () => {
    console.log("goalExists => " + this.goalExists());

    if (this.goalExists()) {
      //Jos goal on jo olemassa, ei edes yritetä luoda uutta koska se veisi aikaa ja resursseja.
      alert("You already have a goal for this course!");
    } else {
      //Goalia ei ole olemassa, joten pitää luoda uusi sellainen

      console.log("Creating a new goal for you!");

      const newGoal = {
        courseid: this.props.course._id,
        userid: this.props.user._id,
        target: this.state.goalTarget,
        difficulty: this.state.goalDifficulty
      };

      if (newGoal.target >= 1 && newGoal.target <= 5) {
        //1-5 kelpaa arvosanaksi
        console.log("Goal to be created: " + JSON.stringify(newGoal));
        this.props.showAlert(
          "Tallennetaan uutta tavoitetta tietokantaan...",
          true
        );

        const response = await goalService.create(newGoal);

        this.props.showAlert("Tavoite tallennettu!");

        console.log("New goal saved:" + JSON.stringify(response.data));
        //Päivitetään lopuksi state.user
        const populatedUser = await userService.get(this.props.user._id);
        this.props.updateUserState(populatedUser);
      } else {
        this.props.showAlert("Tavoitearvosanan tulee olla väliltä 1-5!");
      }
    }

    this.getDifficultyMedian();
    console.log("goalExists => " + this.goalExists());
  };

  goalExists = () => {
    const foundGoal = this.props.user.goals.find(
      goalObject =>
        goalObject.course === this.props.course._id &&
        goalObject.user === this.props.user._id
    );

    //console.log(this.props.course._id + "    " + this.props.user._id)

    //console.log(foundGoal)

    if (foundGoal === undefined) {
      return false;
    } else {
      return true;
    }
  };

  isActive = () => {
    const result = this.props.user.activeCourses.find(
      courseObject => courseObject._id === this.props.course._id
    );

    if (result === undefined) {
      return false;
    } else {
      return true;
    }
  };

  getGoal = () => {
    const foundGoal = this.props.user.goals.find(
      goalObject =>
        goalObject.course === this.props.course._id &&
        goalObject.user === this.props.user._id
    );

    return foundGoal;
  };

  handleFormChange(event) {
    //Hoidetaan kenttiin kohdistuvat muutokset stateen
    //console.log("called handleFormChange")
    //console.log(event.target.name)
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  getCourseHourValue() {
    switch (this.getGoal().difficulty) {
      case "Helppo":
        return 15;
      case "Normaali":
        return 20;
      case "Haastava":
        return 25;
      case "Vaikea":
        return 30;
      default:
        return "Unknown goal.difficulty!";
    }
  }

  getDifficultyMedian = async () => {
    let allGoals = this.props.goals; //Saadaan allGoals propsina niin ei tarvitse hakea joka kurssin kohdalla uusia tietokannasta

    let relevantGoals = [];
    allGoals.forEach(goal => {
      if (goal.course === this.props.course._id) {
        //console.log(goal.difficulty);
        relevantGoals.push(goal);
      }
    });

    let sum = 0;
    relevantGoals.forEach(goal => {
      if (goal.difficulty === "Helppo") {
        sum += 1;
      } else if (goal.difficulty === "Haastava") {
        sum += 2;
      } else if (goal.difficulty === "Vaikea") {
        sum += 3;
      }
    });

    let median = sum / relevantGoals.length;

    //console.log("Median is:  " + median);

    let result = "";
    if (median < 1.5) {
      result = "Helppo (" + relevantGoals.length + ")";
    } else if (median < 2.5) {
      result = "Haastava (" + relevantGoals.length + ")";
    } else {
      result = "Vaikea (" + relevantGoals.length + ")";
    }

    this.setState({ courseMedian: result });
  };

  componentDidMount() {
    this.getDifficultyMedian();
  }

  render() {
    //console.info("Rendering a course.")

    if (
      this.props.course.title
        .toLowerCase()
        .includes(this.props.filter.toLowerCase())
    ) {
      // Jos filter sopii tähän kurssiin...

      if (
        (this.props.showOnlyActiveCourses && this.isActive()) ||
        this.props.showOnlyActiveCourses === false
      ) {
        //Ylläoleva if menee läpi jos (1) halutaan näyttää vain aktiiviset kurssit ja tämä on yksi niistä.
        //(2) Jos halutaan näyttää kaikki kurssit, jatketaan renderöintiä...
        return (
          <Fragment>
            <Grid item xs={12}>
              <Paper style={{ marginBottom: 15 }}>
                <ListItem>
                  <ListItemText primary={this.props.course.title} />

                  {this.goalExists() ? ( //Jos goal on olemassa, renderöidään sen tiedot:
                    <Fragment>
                      <Tooltip title="Laskettu aika, eli päiväkohtainen opiskeluaika (20h/opintopiste)">
                        <Typography
                          variant="body1"
                          style={{ marginRight: "0px" }}
                        >
                          {Math.floor(
                            ((this.props.course.credits * 20) /
                              (this.props.course.length * 7 * 5)) *
                              10
                          ) / 10}
                          h
                        </Typography>
                      </Tooltip>

                      <Fragment>
                        <i className="material-icons">arrow_right_alt</i>
                      </Fragment>
                      <Tooltip title="Henkilökohtainen haastavuuden perusteella painotettu opiskeluaika">
                        <Typography
                          variant="body1"
                          style={{ marginRight: "50px", width: "25px" }}
                        >
                          {Math.floor(
                            ((this.props.course.credits *
                              this.getCourseHourValue()) /
                              (this.props.course.length * 7 * 5)) *
                              10
                          ) / 10}
                          h
                        </Typography>
                      </Tooltip>

                      <Tooltip title="Tavoitearvosana">
                        <Typography style={{ marginRight: 25 }} variant="body1">
                          {this.getGoal().target}
                        </Typography>
                      </Tooltip>

                      <DifficultyDisplay
                        difficulty={this.getGoal().difficulty}
                        courseMedian={this.state.courseMedian}
                      />
                    </Fragment>
                  ) : (
                    //Jos goalia ei ole olemassa, renderöidään kentät tavoitearvosanalle ja vaikeusarviolle. Sekä lisäyspainikkeelle
                    <Fragment>
                      <FormControl
                        onKeyPress={e => this.handleEnter(e)}
                        style={{ marginLeft: 10, width: 100 }}
                      >
                        <InputLabel htmlFor="goal-simple">
                          Tavoitearvosana
                        </InputLabel>
                        <Input
                          id="goal-simple"
                          type="number"
                          name="goalTarget"
                          value={this.state.goalTarget}
                          onChange={event => this.handleFormChange(event)}
                        />
                      </FormControl>

                      <FormControl
                        onKeyPress={e => this.handleEnter(e)}
                        style={{ marginLeft: 10, marginRight: 10 }}
                      >
                        <InputLabel htmlFor="difficulty-native-simple">
                          Haastavuus
                        </InputLabel>
                        <Select
                          native
                          name="goalDifficulty"
                          value={this.state.goalDifficulty}
                          onChange={event => this.handleFormChange(event)}
                        >
                          <option value="Helppo">Helppo</option>
                          <option value="Normaali">Normaali</option>
                          <option value="Haastava">Haastava</option>
                          <option value="Vaikea">Vaikea</option>
                        </Select>
                      </FormControl>

                      <Tooltip title="Tallenna henkilökohtainen tavoite">
                        <Button
                          mini={true}
                          size="small"
                          color="inherit"
                          style={{ marginRight: 50 }}
                          onClick={() => this.createNewGoal()}
                        >
                          <i className="material-icons">save</i>
                        </Button>
                      </Tooltip>
                    </Fragment>
                  )}

                  <Tooltip title="Kurssista saatavat opintopisteet">
                    <Typography
                      style={{ marginRight: 15, width: "50px" }}
                      variant="body1"
                    >
                      {this.props.course.credits} op
                    </Typography>
                  </Tooltip>

                  <Tooltip title="Kurssin pituus">
                    <Typography style={{ width: "7%%" }} variant="body1">
                      {this.props.course.length} periodia
                    </Typography>
                  </Tooltip>

                  <Tooltip title="Muokkaa kurssia">
                    <Link to={`/courses/${this.props.course._id}`}>
                      <i
                        style={{
                          color: "black",
                          padding: 5,
                          marginLeft: 20,
                          marginRight: 20
                        }}
                        className="material-icons"
                      >
                        edit
                      </i>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Poista kurssi">
                    <i
                      style={{ cursor: "pointer" }}
                      className="material-icons"
                      onClick={() => this.deleteCourse(this.props.course._id)}
                    >
                      delete
                    </i>
                  </Tooltip>

                  {this.isActive() ? (
                    <Tooltip title="Deaktivoi">
                      <i
                        style={{
                          cursor: "pointer",
                          color: "green",
                          padding: 5,
                          marginLeft: 20,
                          marginRight: 0
                        }}
                        onClick={() => this.toggleActive(this.props.course._id)}
                        className="material-icons"
                      >
                        check_circle
                      </i>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Aktivoi">
                      <i
                        style={{
                          cursor: "pointer",
                          color: "green",
                          padding: 5,
                          marginLeft: 20,
                          marginRight: 0
                        }}
                        onClick={() => this.toggleActive(this.props.course._id)}
                        className="material-icons"
                      >
                        check_circle_outline
                      </i>
                    </Tooltip>
                  )}
                </ListItem>
              </Paper>
            </Grid>
          </Fragment>
        );
      }
    }
    return null; //Jos filter ei sovi kurssiin palautetaan null.
  }
}
export default Course;
