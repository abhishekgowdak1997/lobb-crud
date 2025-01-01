describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })

  it('sample test', function() {
    cy.get('[alt="Sidebar item 1"]').click();
    cy.get('.ub-w_280px').clear('mad');
    cy.get('.ub-w_280px').type('madad');
    cy.get('.ub-w_300px > .ub-pl_10px').select('South');
    cy.get('.ub-ovflw-y_auto > :nth-child(1) > :nth-child(1)').click();
    cy.get('.ub-ovflw-y_auto > :nth-child(1) > :nth-child(1)').click();
    cy.get('.ub-f-wght_500').click();
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_280px').clear('m');
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_280px').type('maddur');
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_300px > .ub-pl_10px').select('East');
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_auto > .ub-pl_10px').select('Bengaluru');
    cy.get('.ub-just-cnt_flex-end > div.ub-box-szg_border-box > .ub-b-btm_1px-solid-transparent').click();
  });

  it('add city test', function() {
    cy.get('[alt="Sidebar item 1"]').click();
    cy.get('.ub-f-wght_500').click();
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_280px').clear('ma');
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_280px').type('maddur');
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_300px > .ub-pl_10px').select('East');
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_auto > .ub-pl_10px').select('Bengaluru');
    cy.get('.ub-just-cnt_flex-end > div.ub-box-szg_border-box > .ub-b-btm_1px-solid-transparent').click();
  });

  it('editCityTest', function() {
    cy.get('[alt="Sidebar item 1"]').click();
    cy.get(':nth-child(1) > .ub-gap_6px > [alt="edit"]').click();
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_300px > .ub-pl_10px').select('East');
    cy.get('.ub-ovflw-x_auto > :nth-child(1) > :nth-child(1) > .ub-dspl_flex > .ub-w_auto > .ub-pl_10px').select('Chennai');
    cy.get('.ub-just-cnt_flex-end > div.ub-box-szg_border-box > .ub-b-btm_1px-solid-transparent').click();
  });

  it('deleteCityCancel', function() {
    cy.get('[alt="Sidebar item 1"]').click();
    cy.get(':nth-child(1) > .ub-gap_6px > [alt="delete"]').click();
    cy.get(':nth-child(7) > .ub-pst_fixed > .ub-bs_kymczs > .ub-just-cnt_flex-end > div.ub-box-szg_border-box > .ub-b-btm_1px-solid-c1c4d6').click();
  });

  
  it('deleteCityConfirm', function() {
   cy.get('[alt="Sidebar item 1"]').click();
    cy.get(':nth-child(1) > .ub-gap_6px > [alt="delete"]').click();
    cy.get(':nth-child(7) > .ub-pst_fixed > .ub-bs_kymczs > .ub-just-cnt_flex-end > div.ub-box-szg_border-box > .ub-b-btm_1px-solid-transparent').click();
    cy.get(':nth-child(2) > .ub-gap_6px > [alt="delete"]').click();
    cy.get(':nth-child(7) > .ub-pst_fixed > .ub-bs_kymczs > .ub-just-cnt_flex-end > div.ub-box-szg_border-box > .ub-b-btm_1px-solid-transparent').click();
  });

  it('searchCityFilter', function() {
    cy.get('[alt="Sidebar item 1"]').click();
    cy.get('.ub-w_280px').clear('m');
    cy.get('.ub-w_280px').type('mgroad');
    cy.get('.ub-w_300px > .ub-pl_10px').select('East');
    cy.get('.ub-w_auto > .ub-pl_10px').select('Chennai');
  });
})