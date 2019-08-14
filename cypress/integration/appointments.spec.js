describe("Appointments", () => {
  beforeEach(() => {
    cy.request("POST", "/api/debug/reset")

    cy.visit("/")

    cy.contains("[data-testid='day']", 'Monday')
  })


  it('should book an interview', () => {


    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    
    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains('Save').click()


    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })

  it('should edit an interview', () => {
    cy.get('.appointment__card--show').get("[alt='Edit']").click({ force: true })
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })
 
  it('should cancel an interview', () => {

    cy.get("[alt='Delete']").click({ force: true })

    cy.contains("Confirm").click()

    cy.contains("Processing").should("exist");
    cy.contains("Processing").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");

  })



})