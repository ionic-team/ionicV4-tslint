import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionRadioSlotRequiredRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-radio slot="start"></ion-radio>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail with no attributes', () => {
      let source = `
      @Component({
        template: \`
          <ion-radio></ion-radio>\`
           ~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The slot attribute of ion-radio is required. Use slot="start".',
        source
      });
    });

    it('should fail without slot attribute', () => {
      let source = `
      @Component({
        template: \`
          <ion-radio value="grape" checked disabled></ion-radio>\`
           ~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The slot attribute of ion-radio is required. Use slot="start".',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should add slot="start" to ion-radio without attributes', () => {
      let source = `
        @Component({
          template: \`<ion-radio></ion-radio>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The slot attribute of ion-radio is required. Use slot="start".',
        startPosition: {
          line: 2,
          character: 22
        },
        endPosition: {
          line: 2,
          character: 31
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-radio slot="start"></ion-radio>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should add slot="start" to ion-radio without slot', () => {
      let source = `
        @Component({
          template: \`
            <ion-radio value="grape" checked disabled></ion-radio>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The slot attribute of ion-radio is required. Use slot="start".',
        startPosition: {
          line: 3,
          character: 13
        },
        endPosition: {
          line: 3,
          character: 22
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-radio slot="start" value="grape" checked disabled></ion-radio>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should add slot="start" to ion-radio without slot on multiline', () => {
      let source = `
        @Component({
          template: \`
            <ion-radio
              value="grape"
              checked
              disabled></ion-radio>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The slot attribute of ion-radio is required. Use slot="start".',
        startPosition: {
          line: 3,
          character: 13
        },
        endPosition: {
          line: 3,
          character: 22
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-radio slot="start"
              value="grape"
              checked
              disabled></ion-radio>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
