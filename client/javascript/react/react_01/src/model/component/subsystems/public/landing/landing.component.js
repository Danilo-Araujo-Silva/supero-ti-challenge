/**
 * Component to the landing page.
 * For simplicity (mainly to handle states) there is just one component to the
 *  entire application.
 * A complete application should considere use several components and a single
 *  store implementation like redux.
 */
import React from 'react';
import {TextField, RaisedButton} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid';

import taskService from 'model/service/task.service';

import './landing.component.css';

export class Landing extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      item: {},
      list: [],
      meta: {
        lines: [],
        response: {
          title: "",
          message: ""
        }
      }
    }
  }

  componentWillMount = () => {
    this.getAllVisible()
  }

  /**
   * Pass typing to the state.
   */
  onChangeTitle = (event) => {
    this.setState({
      item: {
        ...this.state.item,
        title: event.target.value
      }
    })
  }

  /**
   * Pass typing to the state.
   */
  onChangeDescription = (event) => {
    this.setState({
      item: {
        ...this.state.item,
        description: event.target.value
      }
    })
  }

  /**
   * Clear the fields used to insert or update tasks.
   */
  clear = (event) => {
    this.setState({
      ...this.state,
      item: {
        title: "",
        description: ""
      }
    })
  }

  /**
   * Populate the fields to edit a task.
   */
  edit = (item) => {
    const inner = (event) => {
      this.setState({
        item: item
      })
    }

    return inner
  }

  /**
   * Insert or update a task calling an external API.
   */
  insertOrUpdate = (event) => {
    const callback = (response) => {
      this.checkResponse(response)
      if (
        response.title
        && response.title !== "Erro"
      ) {
        this.clear()
      }
      this.getAllVisible()
    }

    if (this.state.item.id) {
      taskService.update(this.state.item, callback);
    } else {
      taskService.insert(this.state.item, callback);
    }
  }

  /**
   * Toggle a pending status to completed or vice-versa.
   * Call an external API.
   */
  toggleStatus = (id) => {
    const inner = (event) => {
      const callback = (response) => {
        this.checkResponse(response)
        this.getAllVisible()
      }

      taskService.toggleStatus(id, callback)
    }

    return inner
  }

  /**
   * 'Delete' a task by it's id.
   * A 'deleted' task is a disabled task.
   * Call an external API.
   */
  delete = (id) => {
    const inner = (event) => {
      const callback = (response) => {
        this.checkResponse(response)
        this.getAllVisible()
      }

      taskService.delete(id, callback)
    }

    return inner
  }

  /**
   * Get all visible tasks.
   * Call an external API.
   */
  getAllVisible = () => {
    const callback = (list) => {
      this.checkResponse(list)

      this.setState({
        ...this.state,
        list: list
      })

      const lines = list.map((item) => {
        return this.createLine(item)
      })

      this.setState({
        meta: {
          ...this.state.meta,
          lines: lines
        }
      })
    }

    taskService.getAllVisible(callback)
  }

  /**
   * Check if a response sent from an external API contain a message
   *  that should be displayed. If it is, the message is merged on the state.
   */
  checkResponse = (response) => {
    if (response.title) {
      this.setState({
        meta: {
          ...this.state.meta,
          response: response
        }
      })
    }
  }

  /**
   * Create a new task line in the task table.
   * This is a good candidate to be a separated component.
   */
  createLine = (item) => {
    const formatStatus = (status) => {
      if (!status) {
        return "Desconhecido"
      } else if (status === "pending") {
        return "Pendente"
      } else if (status === "completed") {
        return "Concluída"
      } else if (status === "deleted") {
        return "Removida"
      }
    }

    const formatDateTime = (long) => {
      /*
       * 1493660573000 is the initial date.
       * It is skipped here.
       */
      if (!long || long === 1493660573000) {
        return ""
      } else {
        const dateOptions = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };

        return new Date(long)
          .toLocaleDateString(
            "pt-BR",
            dateOptions
          )
      }
    }

    return <tr key={item.id} >
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{formatStatus(item.status)}</td>
      <td>{item.description}</td>
      <td>{formatDateTime(item.createdAt)}</td>
      {/*<td>{item.createdBy}</td>*/}
      <td>{formatDateTime(item.updatedAt)}</td>
      {/*<td>{item.updatedBy}</td>*/}
      {/*<td>{item.deletedAt}</td>*/}
      {/*<td>{item.deletedBy}</td>*/}
      <td>{formatDateTime(item.completedAt)}</td>
      {/*<td>{item.completedBy}</td>*/}
      <td>
        <Row>
          <Col xs={12} md={4} className="little-padding">
            <RaisedButton
              label="Alterar"
              onClick={this.edit(item)}
              disabled={item.completedAt != null}
            />
          </Col>
          <Col xs={12} md={4} className="little-padding">
            <RaisedButton
              label={item.completedAt != null ? "Reabrir" : "Concluir"}
              onClick={this.toggleStatus(item.id)}
            />
          </Col>
          <Col xs={12} md={4} className="little-padding">
            <RaisedButton
              label="Remover"
              onClick={this.delete(item.id)}
            />
          </Col>
        </Row>
      </td>
    </tr>
  }

  /**
   * Render the entire landing component.
   * Several parts of this component could be separated in minor components.
   * But for simplicity (and to handle states more easily in this case) only one`
   *  big component was created (the Landing one).
   * A more robust application should create several components and use a single
   *  store like redux.
   */
  render() {
    return <div>
      <h1>Task Manager</h1>
      <Grid fluid>
        <Row>
          <Col xs={12}>
            {
              this.state.meta.response.title === "Erro"
              && <div className="alert alert-danger" role="alert">
                {this.state.meta.response.message}
              </div>
            }
            {
              this.state.meta.response.title === "Sucesso"
              && <div className="alert alert-info" role="alert">
                {this.state.meta.response.message}
              </div>
            }
          </Col>
        </Row>
      </Grid>
      <form>
        <Grid fluid>
          <Row>
            <Col xs={3}>Título</Col>
            <Col xs={9}>
              <TextField
                id='title'
                value={this.state.item.title}
                onChange={this.onChangeTitle}
                fullWidth={true}
                multiLine={true}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={3}>Descrição</Col>
            <Col xs={9}>
              <TextField
                id='description'
                value={this.state.item.description}
                onChange={this.onChangeDescription}
                fullWidth={true}
                multiLine={true}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RaisedButton
                label="Salvar"
                onClick={this.insertOrUpdate}
                className="little-margin"
              />

              <RaisedButton
                label="Limpar"
                onClick={this.clear}
              />
            </Col>
          </Row>
        </Grid>
      </form>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Criação</th>
            {/*<th>Created by</th>*/}
            <th>Última atualização</th>
            {/*<th>Updated by</th>*/}
            {/*<th>Data da deleção</th>*/}
            {/*<th>Deleted by</th>*/}
            <th>Conclusão</th>
            {/*<th>Completed by</th>*/}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.state.meta.lines}
        </tbody>
      </table>
    </div>;
  }
};
