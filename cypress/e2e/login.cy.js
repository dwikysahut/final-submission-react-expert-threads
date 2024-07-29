/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when username is not valid email format
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('template spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Submit$/)
      .should('be.visible');
  });
  it('should display alert when username is empty', () => {
    cy.visit('http://localhost:5173');
    cy.get('button')
      .contains(/^Submit$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });
  it('should display alert when username is not valid email format', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Username"]').first().type('testuser');
    cy.get('button')
      .contains(/^Submit$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });
  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Username"]').first().type('testuser@gmail.com');
    cy.get('button')
      .contains(/^Submit$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.visit('http://localhost:5173');
    // mengisi username
    cy.get('input[placeholder="Username"]').first().type('testuser@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').first().type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Submit$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });
  it('should display homepage when username and password are correct', () => {
    cy.visit('http://localhost:5173');

    // mengisi username
    cy.get('input[placeholder="Username"]').first().type('ddd@gmail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').first().type('dddddd');

    // menekan tombol Login
    cy.get('button').contains(/^Submit$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('p').contains(/^Threads$/).should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});
