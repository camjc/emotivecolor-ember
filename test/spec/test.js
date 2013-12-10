/*global describe, it */
'use strict';
(function () {

// //================================================================================
// // Test Code

// // Replace our REST-based store with a fixture-based store for testing, so we
// // don't need a server.  We disable simulateRemoteResponse so that objects will
// // appear to load at the end of every Ember.run block instead of waiting for a
// // timer to fire.
    // Emotivecolor.Store = DS.Store.extend({
    //     revision: 12,
    //     adapter: DS.FixtureAdapter.create({ simulateRemoteResponse: false })
    // });

// // // Declare some fixture objects to use in our test application.  There's
// // // nothing like factory_girl or machinist yet.
//     Emotivecolor.Color.FIXTURES = [
//         {
//             id: 0,
//             hex: '9a6366',
//             emotion: 'Love'
//         },
//         {
//             id: 1,
//             hex: 'b553be',
//             emotion: 'Flirty'
//         },
//         {
//             id: 2,
//             hex: '2ef63b',
//             emotion: 'Surprised'
//         },
//         {
//             id: 3,
//             hex: 'de8c9a',
//             emotion: 'Happy'
//         },
//         {
//             id: 4,
//             hex: 'be40c7',
//             emotion: 'Anxious'
//         }
//     ];

    // Run before each test case.
    beforeEach(function () {
        // Put the application into a known state, and destroy the defaultStore.
        // Be careful about DS.Model instances stored in App; they'll be invalid
        // after this.
        // This is broken in some versions of Ember and Ember Data, see:
        // https://github.com/emberjs/data/issues/847
        Ember.run(function () { Emotivecolor.reset(); });
        // Display an error if asynchronous operations are queued outside of
        // Ember.run.  You need this if you want to stay sane.
        Ember.testing = true;
    });

    // Run after each test case.
    afterEach(function () {
        Ember.testing = false;
    });

// // Optional: Clean up after our last test so you can try out the app
// // in the jsFiddle.  This isn't normally required.
// after(function () {
//     Ember.run(function () { Emotivecolor.reset(); });
// });

// Load associations immediately, instead of waiting for FixtureAdapter's
// asynchronous loads.  Basically, all we need to do is access each object
// from inside Ember.run.
// TODO: We can't test this or insert where needed until Emotivecolor.reset() works.
// TODO: Handle hasMany.
function loadAssociations(object /*, paths... */) {
    var paths = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < paths.length; i++) {
        var components = paths[i].split(".");
        for (var j = 0; j < components.length; j++) {
            Ember.run(function () {
                var path = components.slice(0, j+1).join(".");
                object.get(path);
            });
        }
    }
}

    // Sample model test.
    describe('Checking the model', function () {
        it('should have a hex', function () {
            expect(0).to.equal(0);
            // var firstHex;
            // Ember.run(function () {
            //     // Won't actually load until the end of the run-block.
            //     firstHex = Emotivecolor.Color.find(1);
            // });
            // firstHex.get("hex").should.equal("9a6366");
        });
    });

    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {
            expect(5).to.equal(0);

            });
        });
    });

// Sample controller test.
describe("Emotivecolor.ColorController", function () {
    var model, controller;
 
    beforeEach(function () {
        Ember.run(function () {
            // We could also fetch a model from our fixtures.
            model = Emotivecolor.Color.createRecord({ salary: 100000 });
            controller = Emotivecolor.ColorController.create({ content: model });
        });
    });
    
    it("can give the employee a raise", function () {
        var oldSalary = model.get("salary");
        Ember.run(function () {
            controller.giveRaise();
        });
        model.get("salary").should.be(oldSalary * 1.1);
    });
});

// Sample view test.
describe("Emotivecolor.ColorView", function () {
    var controller, view;
 
    beforeEach(function () {
        Ember.run(function () {
            var model = Emotivecolor.Color.find(1);
            controller = Emotivecolor.ColorController.create({
                // We need a container to test views with linkTo.
                container: Emotivecolor.__container__,
                content: model
            });
            // If for some reason we want to isolate this, we can use
            // a sinon stub to intercept certain calls.
            sinon.stub(controller, "giveRaise");
            view = Emotivecolor.ColorView.create({
                controller: controller,
                context: controller
            });
            view.append(); // Hook up to our document.
        });
    });
    
    afterEach(function () {
        Ember.run(function () {
            view.remove(); // Unhook from our document.
        });
    });
    
    it("shows the employee's name", function () {
        // This uses a chai-jquery assertion.
        view.$("h2").should.have.text("Jane Q. Public");
        view.$(".manages li").text().should.match(/John/);
    });
    
    it("has a button which gives the employee a raise", function () {
        view.$("button").click();
        // We use a sinon-chai method here.
        controller.giveRaise.should.have.been.calledOnce;
    });
});

// Sample acceptance test.
describe("Employee features", function () {
    it("give John's boss a raise", function () {
        $("a:contains('Show employees')").click();
        $("a:contains('John')").click();
        $(".managed-by a").click();
        $(".salary").should.have.text("$80000");
        $("button:contains('Give Raise')").click();
        $(".salary").should.have.text("$88000");
    });
});
}());