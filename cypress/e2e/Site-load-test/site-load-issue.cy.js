import urls from '../../fixtures/urls.json'
describe('check site load issue', () => {

  urls.slice(0, 3).forEach((url) => {
    it(url,()=>{
        cy.wait(2000);
        let site ='https://'+url;
        cy.visit(site);
        cy.wait(2000);
        cy.scrollTo('bottom', {duration: 7000});
        let windowErrorSpy;
        cy.wait(4000);

        Cypress.on('window:before:load', (win) => {
            cy.spy(win.console, 'log').as('consoleLog');
            cy.spy(win.console, 'warn').as('consoleLogWarn');
            windowErrorSpy = cy.spy(win.console, 'error').as('consoleLogError'); 
        });

        cy.window().then((win) => {
            let len = windowErrorSpy.args.length;
            if(windowErrorSpy){
                for(let i=0;i<len;i++){
                    console.log(windowErrorSpy.args[i]);
                    let error = windowErrorSpy.args[i];
                    let msg = JSON.stringify(error);
                    console.log(msg);

                    if(msg.includes("No compatible source was found for this media")) {
                        cy.log('warning:VIDEO ISSUE')
                    }  
                    else if(msg.includes("Your ReferralHero subscription has been canceled. You must reactivate to continue using ReferralHero."))
                    {
                        cy.log('waring: ReferralHero subscription cancelled')
                    } 
                    else if(msg.includes("404 (not found)"))
                    {
                        cy.log('waring: Resource not found')
                    } 
                    else if(msg.includes("Failed to load resource"))
                    {
                       cy.log('waring: Resource not found')
                    } 
                    else
                    {
                        cy.log('ERROR: site load issue')
                        expect(true).to.be.false
                    }
                }; 
            };  
        });
    });  

}); 

});       

