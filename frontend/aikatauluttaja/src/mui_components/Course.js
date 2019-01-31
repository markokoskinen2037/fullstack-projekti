import React, { Fragment } from 'react'
import courseService from '../services/courses'
import userService from '../services/users'
import goalService from '../services/goals'

import { Input, FormControl, InputLabel, Select } from '@material-ui/core/'

import '../styles/course.css'

import { Link } from 'react-router-dom'

import { Paper, Button, Tooltip } from '@material-ui/core/'
import DifficultyDisplay from './DifficultyDisplay'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goalTarget: 5,
      goalDifficulty: 'Helppo',
      goalExists: false,
      isActive: false,
      courseMedian: undefined,
      goals: undefined,
    }
  }

  handleEnter = e => {
    if (e.which === 13) {
      alert('todo')
    }
  }

  deleteCourse = async course_id => {
    if (
      this.props.user._id === this.props.course.user ||
      this.props.user._id === this.props.course.user._id
    ) {
      //Matchaa, sallitaan poisto
      //Poistetaan kurssi tietokannasta
      courseService.removeById(course_id, this.props.user._id)
      //TODO Poista kurssi statesta
      this.props.removeCourseFromCourseListState(course_id)
      //reloadCoursesFromBackend() //Tää pitää korjata lokaalilla staten manipulaatiolla
    } else {
      this.props.showAlert('Sinulla ei oikeuksia poistaa tätä kurssia!')
      //alert(this.props.user._id + "   " + this.props.course.user._id)
    }
  }

  toggleActive = async course_id => {
    if (
      this.props.user.activeCourses.find(course => course._id === course_id)
    ) {
      //Jos aktivoitava kurssi on listalla

      var newList = this.props.user.activeCourses.filter(
        course => course._id !== course_id
      ) //Poistetaan kurssi aktiivisten listasta
      this.props.user.activeCourses = newList
    } else {
      //Jos aktivoitava kurssi ei ole listalla

      this.props.user.activeCourses = this.props.user.activeCourses.concat(
        this.props.course
      ) //Lisätään aktivoitava kurssi listalle
    }

    let uusiAktiivistenKurssienLista = {
      activeCourses: this.props.user.activeCourses,
    }

    let temp = !this.isActive
    this.setState({ isActive: temp })

    await userService.update(this.props.user._id, uusiAktiivistenKurssienLista)

    const populatedUser = await userService.get(this.props.user._id)

    this.props.updateUserState(populatedUser)
    this.props.toggleActive()
  }

  createNewGoal = async () => {
    if (this.goalExists()) {
      //Jos goal on jo olemassa, ei edes yritetä luoda uutta koska se veisi aikaa ja resursseja.
      alert('You already have a goal for this course!')
    } else {
      //Goalia ei ole olemassa, joten pitää luoda uusi sellainen

      const newGoal = {
        courseid: this.props.course._id,
        userid: this.props.user._id,
        target: this.state.goalTarget,
        difficulty: this.state.goalDifficulty,
      }

      if (newGoal.target >= 1 && newGoal.target <= 5) {
        //1-5 kelpaa arvosanaksi
        this.props.showAlert(
          'Tallennetaan uutta tavoitetta tietokantaan...',
          true
        )

        await goalService.create(newGoal)

        this.props.showAlert('Tavoite tallennettu!')

        //Päivitetään lopuksi state.user
        const populatedUser = await userService.get(this.props.user._id)
        this.props.updateUserState(populatedUser)
      } else {
        this.props.showAlert('Tavoitearvosanan tulee olla väliltä 1-5!')
      }
    }

    this.getDifficultyMedian()
  }

  goalExists = () => {
    const foundGoal = this.props.user.goals.find(
      goalObject =>
        goalObject.course === this.props.course._id &&
        goalObject.user === this.props.user._id
    )

    if (foundGoal === undefined) {
      return false
    } else {
      return true
    }
  }

  isActive = () => {
    const result = this.props.user.activeCourses.find(
      courseObject => courseObject._id === this.props.course._id
    )

    if (result === undefined) {
      return false
    } else {
      return true
    }
  }

  getGoal = () => {
    const foundGoal = this.props.user.goals.find(
      goalObject =>
        goalObject.course === this.props.course._id &&
        goalObject.user === this.props.user._id
    )

    return foundGoal
  }

  handleFormChange(event) {
    //Hoidetaan kenttiin kohdistuvat muutokset stateen
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
    })
  }

  getCourseHourValue() {
    switch (this.getGoal().difficulty) {
      case 'Helppo':
        return 15
      case 'Normaali':
        return 20
      case 'Haastava':
        return 25
      case 'Vaikea':
        return 30
      default:
        return 'Unknown goal.difficulty!'
    }
  }

  getDifficultyMedian = async () => {
    let allGoals = this.props.goals //Saadaan allGoals propsina niin ei tarvitse hakea joka kurssin kohdalla uusia tietokannasta

    let relevantGoals = []
    allGoals.forEach(goal => {
      if (goal.course === this.props.course._id) {
        relevantGoals.push(goal)
      }
    })

    let sum = 0
    relevantGoals.forEach(goal => {
      if (goal.difficulty === 'Helppo') {
        sum += 1
      } else if (goal.difficulty === 'Haastava') {
        sum += 2
      } else if (goal.difficulty === 'Vaikea') {
        sum += 3
      }
    })

    let median = sum / relevantGoals.length

    let result = ''
    if (median < 1.5) {
      result = 'Helppo (' + relevantGoals.length + ')'
    } else if (median < 2.5) {
      result = 'Haastava (' + relevantGoals.length + ')'
    } else {
      result = 'Vaikea (' + relevantGoals.length + ')'
    }

    this.setState({ courseMedian: result })
  }

  componentDidMount() {
    this.getDifficultyMedian()
  }

  render() {
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
            <Paper className="courseContainer">
              <span className="courseName">{this.props.course.title}</span>

              <Tooltip title="Kurssista saatavat opintopisteet">
                <span className="small" variant="body1">
                  {this.props.course.credits} op
                </span>
              </Tooltip>

              <Tooltip title="Kurssin pituus">
                <span className="small" variant="body1">
                  {this.props.course.length} periodia
                </span>
              </Tooltip>

              {this.goalExists() ? ( //Jos goal on olemassa, renderöidään sen tiedot:
                <Fragment>
                  <span className="workloadEstimate">
                    <span style={{ minWidth: '15%' }}>
                      <Tooltip title="Laskettu aika, eli päiväkohtainen opiskeluaika (20h/opintopiste)">
                        <span>
                          {Math.floor(
                            ((this.props.course.credits * 20) /
                              (this.props.course.length * 7 * 5)) *
                              10
                          ) / 10}
                          h
                        </span>
                      </Tooltip>

                      <span>
                        <i className="material-icons arrow">arrow_right_alt</i>
                      </span>
                      <Tooltip title="Henkilökohtainen haastavuuden perusteella painotettu opiskeluaika">
                        <span variant="body1">
                          {Math.floor(
                            ((this.props.course.credits *
                              this.getCourseHourValue()) /
                              (this.props.course.length * 7 * 5)) *
                              10
                          ) / 10}
                          h
                        </span>
                      </Tooltip>
                    </span>
                  </span>

                  <DifficultyDisplay
                    difficulty={this.getGoal().difficulty}
                    courseMedian={this.state.courseMedian}
                  />

                  <span className="small">
                    <Tooltip title="Tavoitearvosana">
                      <span className="part1" variant="body1">
                        Tavoite: {this.getGoal().target}
                      </span>
                    </Tooltip>
                  </span>
                </Fragment>
              ) : (
                //Jos goalia ei ole olemassa, renderöidään kentät tavoitearvosanalle ja vaikeusarviolle. Sekä lisäyspainikkeelle
                <Fragment>
                  <span className="placeHolder" />

                  <span className="difficultyDisplay">
                    <FormControl
                      style={{ width: 100 }}
                      onKeyPress={e => this.handleEnter(e)}
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

                    <FormControl onKeyPress={e => this.handleEnter(e)}>
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
                  </span>
                  <Tooltip title="Tallenna henkilökohtainen tavoite">
                    <i
                      onClick={() => this.createNewGoal()}
                      className="material-icons small  clickable saveButton"
                    >
                      save
                    </i>
                  </Tooltip>
                </Fragment>
              )}

              <span className="buttons">
                <Tooltip title="Muokkaa kurssia">
                  <Link to={`/courses/${this.props.course._id}`}>
                    <i className="material-icons icon">edit</i>
                  </Link>
                </Tooltip>
                <Tooltip title="Poista kurssi">
                  <i
                    className="material-icons icon clickable"
                    onClick={() => this.deleteCourse(this.props.course._id)}
                  >
                    delete
                  </i>
                </Tooltip>

                {this.isActive() ? (
                  <Tooltip title="Poista suoritusmerkintä">
                    <i
                      onClick={() => this.toggleActive(this.props.course._id)}
                      className="material-icons icon clickable completed"
                    >
                      check_circle
                    </i>
                  </Tooltip>
                ) : (
                  <Tooltip title="Merkitse suoritetuksi">
                    <i
                      onClick={() => this.toggleActive(this.props.course._id)}
                      className="material-icons icon clickable not_completed"
                    >
                      check_circle_outline
                    </i>
                  </Tooltip>
                )}
              </span>
            </Paper>
          </Fragment>
        )
      }
    }
    return null //Jos filter ei sovi kurssiin palautetaan null.
  }
}
export default Course
