import React, { Component } from 'react';

export default class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-m p-1">
            <div className="container-fluid justify-content-center">
              <a href="/" className="navbar-brand fw-bold text-uppercase">
                 Employee Management App
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
