/**
 * Service for tasks.
 * Make calls to an external API.
 */
import properties from './../../../../../shared/model/configuration/properties';

const prefix = 'task'
const urlPrefix = `http://${properties.constants.server.spring_boot.host}:${properties.constants.server.spring_boot.port}/${prefix}`

const taskService = {
  get: function(id, callback) {
    fetch(
      `${urlPrefix}/get/${id}`
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json);
    });
  },
  getAll: function(callback) {
    fetch(
      `${urlPrefix}/list/all`
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json);
    });
  },
  getAllVisible: function(callback) {
    fetch(
      `${urlPrefix}/list/visible`
    ).then(function(response) {
      return response.json()
    }).then(function(json) {
      callback(json);
    });
  },
  insert: function(entity, callback) {
    fetch(
      `${urlPrefix}/insert`,
      {
        method: 'POST',
        body: JSON.stringify(entity),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json)
    });
  },
  update: function(entity, callback) {
    fetch(
      `${urlPrefix}/update`,
      {
        method: 'PUT',
        body: JSON.stringify(entity),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json)
    });
  },
  toggleStatus: function(id, callback) {
    fetch(
      `${urlPrefix}/toggleStatus/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({'id': id}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json)
    });
  },
  delete: function(id, callback) {
    fetch(
      `${urlPrefix}/delete/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({'id': id}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json)
    });
  }
}

export default taskService;
