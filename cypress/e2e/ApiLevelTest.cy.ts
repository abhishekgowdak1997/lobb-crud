describe('template spec', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('passes', () => {
      cy.visit('http://localhost:3000/')
    })

    it('GET /api/city - should retrieve city data', () => {
        cy.request({
          method: 'GET',
          url: 'https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city',
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('Data');
        });
    
      });
    
      it('GET /api/branches - should retrieve branches', () => {
        cy.request({
          method: 'GET',
          url: 'https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/branches',
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('Data');
        });
    
      });
      it('POST /api/city - should add a new city', () => {
          const payload = {
            city_name: 'New City',
            zone: 'South',
            branch: 'Bengaluru',
          };
    
          cy.request({
            method: 'POST',
            url: 'https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city',
            body: payload,
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('Info', 'Successfully Added City');
          });
        })
    
        it('POST/api/city-should update a city',()=>{
          const payload={
            city_name: 'New City',
            zone: 'South',
            branch: 'Bengaluru',
          }
          cy.request({
            method: 'POST',
            url: 'https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/update-cities',
            body: payload,
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
          });
        })

        it('should retrieve all city data without filters', () => {
            cy.request({
              method: 'GET',
              url: 'https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city',
            }).then((response) => {
              expect(response.status).to.eq(200); 
              expect(response.body).to.have.property('Data').and.to.be.an('array'); 
            });
          });

          it('should retrieve filtered city data based on city_name', () => {
            const params = { city_name: 'New City' };
            cy.request({
              method: 'GET',
              url: `https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city?${new URLSearchParams(params).toString()}`,
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body).to.have.property('Data').and.to.be.an('array');
            });
          });

          it('should retrieve filtered city data based on city_name and zone', () => {
            const params = { city_name: 'New City', zone: 'South' };
            cy.request({
              method: 'GET',
              url: `https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city?${new URLSearchParams(params).toString()}`,
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body).to.have.property('Data').and.to.be.an('array');
            });
          });
        
          it('should return an array for unmatched filters', () => {
            const params = { city_name: 'Nonexistent City', zone: 'North' };
            cy.request({
              method: 'GET',
              url: `https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city?${new URLSearchParams(params).toString()}`,
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body).to.have.property('Data').and.to.be.an('array');
            });
          });
      

})