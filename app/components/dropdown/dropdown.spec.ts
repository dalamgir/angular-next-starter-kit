import '../../core/tests.ts';
import {chai} from '../../core/tests.ts';

var expect = chai.expect;

describe('Unit tests for DropDown component', () => {

    describe('2 + 4', () => {

        it('should be 6', (done) => {
            expect(2 + 4).to.equal(6);
            done();
        });

        it('should not be 7', (done) => {
            expect(2 + 4).to.not.equals(7);
            done();
        });

        it('should be 10', (done) => {
            expect(6 + 4).to.equal(10);
            done();
        });

        it('should not be 20', (done) => {
            expect(10 + 10).to.not.equal(20);
            done();
        });

    });

});
