describe('students', () => {
    beforeEach( ()=> {
        cy.visit('http://127.0.0.1:8000')
        cy.get('#btn-student-homepage').click()
    })

    it("i can click button add new student", () => {
        cy.get('#btn-add-new-student').click()
        cy.contains("Create Student")
    })   

    it("i can't add new student with no input all form", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#btn-submit').click()
        cy.get('#error-message-firstname').should('contain.text', 'The firstname field is required.')
        cy.get('#error-message-lastname').should('contain.text', 'The lastname field is required.')
        cy.get('#error-message-email').should('contain.text', 'The email field is required.')
        cy.get('#error-message-phone').should('contain.text', 'The phone field is required.')
    })

    it("i can't add new student with no input first name", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#lastname').type('sepriaji')
        cy.get('#email').type('fiky.anggra@gmail.com')
        cy.get('#phone').type('089676848398')
        cy.get('#btn-submit').click()
        cy.get('#error-message-firstname').should('contain.text', 'The firstname field is required.')
    })

    it("i can't add new student with no input last name", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#firstname').type('fiky anggra')
        cy.get('#email').type('fiky.anggra@gmail.com')
        cy.get('#phone').type('089676848398')
        cy.get('#btn-submit').click()
        cy.get('#error-message-lastname').should('contain.text', 'The lastname field is required.')
        
    })
    it("i can't add new student with no input email", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#firstname').type('fiky anggra')
        cy.get('#lastname').type('sepriaji')
        cy.get('#phone').type('089676848398')
        cy.get('#btn-submit').click()
        cy.get('#error-message-email').should('contain.text', 'The email field is required.')
    })
    
    it("i can't add new student with no input phone", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#firstname').type('fiky anggra')
        cy.get('#lastname').type('sepriaji')
        cy.get('#email').type('fiky.anggra@gmail.com')
        cy.get('#btn-submit').click()
        cy.get('#error-message-phone').should('contain.text', 'The phone field is required.')
    })
    
    it("i can't add new student with invalid email", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#firstname').type('fiky anggra')
        cy.get('#lastname').type('sepriaji')
        cy.get('#email').type('fiky.anggra')
        cy.get('#phone').type('089676848398')
        cy.get('#btn-submit').click()
        cy.get('input:invalid').should('have.length', 1)
    })
    
    it("i can't add new student with email already added", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#firstname').type('fiky anggra')
        cy.get('#lastname').type('sepriaji')
        cy.get('#email').type('testuser@gmail.com')
        cy.get('#phone').type('089676848398')
        cy.get('#btn-submit').click()
        cy.get('#error-message-email').should('contain.text', 'The email has already been taken.')
    })
    
    it("i can't add new student with invalid input phone", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#firstname').type('fiky anggra')
        cy.get('#lastname').type('sepriaji')
        cy.get('#email').type('fiky.anggra@gmail.com')
        cy.get('#phone').type('abc')
        cy.get('#btn-submit').click()
        cy.get('#error-message-phone').should('contain.text', 'The phone field must be a number.')
    })
    
    it("i success add new student", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#firstname').type('fiky anggra')
        cy.get('#lastname').type('sepriaji')
        cy.get('#email').type('fiky.anggra@gmail.com')
        cy.get('#phone').type('089676848398')
        cy.get('#btn-submit').click()
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#table-body-email').should('contain.text', 'fiky.anggra@gmail.com')
    })
    
    it("i can back at create new student page", () => {
        cy.get('#btn-add-new-student').click()
        cy.get('#btn-back').click()
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#table-body-email').should('contain.text', 'fiky.anggra@gmail.com')
    })
    
    it("i can click button edit", () => {
        const tableData = []
        cy.get('table tbody tr').filter(':contains("fiky.anggra@gmail.com")').first().then(($row) => {
            cy.wrap($row).find('td').each(($cell) => {
                tableData.push($cell.text())
            }).then(() => {
                cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click();
                cy.contains("Update Student informations");
                cy.get('#firstname').invoke('val').should('eq', tableData[1]);
                cy.get('#lastname').invoke('val').should('eq', tableData[2]);
                cy.get('#email').invoke('val').should('eq', tableData[3]);
                cy.get('#phone').invoke('val').should('eq', tableData[4]);
            })
        })
    })
    
    it("i can't update student with delete inputted first name", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#firstname').clear()
        cy.get('#btn-update').click()
        cy.get('#error-message-firstname').should('contain.text', 'The firstname field is required.')
    })
    
    it("i can't update student with delete inputted last name", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#lastname').clear()
        cy.get('#btn-update').click()
        cy.get('#error-message-lastname').should('contain.text', 'The lastname field is required.')
    })
    
    it("i can't update student with delete inputted email", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#email').clear()
        cy.get('#btn-update').click()
        cy.get('#error-message-email').should('contain.text', 'The email field is required.')
    })
    
    it("i can't update student with change email to invalid", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#email').clear().type('fiky')
        cy.get('#btn-update').click()
        cy.get('input:invalid').should('have.length', 1)
    })
    
    it("i can't update student with delete inputted phone", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#phone').clear()
        cy.get('#btn-update').click()
        cy.get('#error-message-phone').should('contain.text', 'The phone field is required.')
    })

    it("i can't update student with change phone to invalid", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#phone').clear().type('abc')
        cy.get('#btn-update').click()
        cy.get('#error-message-phone').should('contain.text', 'The phone field must be a number.')
    })
    
    it("i can update student with change first name", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#firstname').clear().type('fiky')
        cy.get('#btn-update').click()
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#table-body-firstname').should('contain.text', 'fiky')
    })
    
    it("i can update student with change last name", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#lastname').clear().type('anggra')
        cy.get('#btn-update').click()
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#table-body-lastname').should('contain.text', 'anggra')
    })
    
    it("i can update student with change email", () => {
        cy.contains('td', 'fiky.anggra@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#email').clear().type('fiky.anggra1@gmail.com')
        cy.get('#btn-update').click()
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#table-body-email').should('contain.text', 'fiky.anggra1@gmail.com')
    })
    
    it("i can update student with change phone", () => {
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#phone').clear().type('0896768483988')
        cy.get('#btn-update').click()
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#table-body-phone').should('contain.text', '0896768483988')
    })
    
    it("i can back at update student page", () => {
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#action-edit').click()
        cy.get('#btn-back').click()
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#table-body-email').should('contain.text', 'fiky.anggra1@gmail.com')
    })
    
    it("i can click button view", () => {
        const tableData = []
        cy.get('table tbody tr').filter(':contains("fiky.anggra1@gmail.com")').first().then(($row) => {
            cy.wrap($row).find('td').each(($cell) => {
                tableData.push($cell.text())
            }).then(() => {
                cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#action-view').click();
                const fullName = tableData[1] + ' ' + tableData[2];
                cy.get('#txt-view-fullname').invoke('text').should('eq', fullName);
                cy.get('#txt-view-email').invoke('text').should('eq', tableData[3]);
                cy.get('#txt-view-phone').invoke('text').should('eq', tableData[4]);
            })
        })
    })
    
    it("i can back at view student page", () => {
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#action-view').click()
        cy.get('#btn-back').click()
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#table-body-email').should('contain.text', 'fiky.anggra1@gmail.com')
    })

    it("i can click button delete", () => {
        cy.contains('td', 'fiky.anggra1@gmail.com').parent('tr').find('#action-delete').click()
        cy.get('table tbody tr').each(($tr) => {
            cy.wrap($tr).find('#table-body-email').each(($td) => {
                const text = $td.text().trim();
                expect(text).to.not.equal('fiky.anggra1@gmail.com');
            });
        });
    })

    it("i can go to homepage from student page", () => {
        cy.get('#header-all').click()
        cy.get('#header-logo').click().should('contain.text', 'Multiple system crud')
    })

    it("i can go to employe page from student page", () => {
        cy.get('#header-employe').click()
        cy.get('h3').should('contain.text', 'Employes crud Program')
    })

    it("i can go to product page from student page", () => {
        cy.get('#header-product').click()
        cy.get('h3').should('contain.text', 'Products crud Program')
    })
    
})