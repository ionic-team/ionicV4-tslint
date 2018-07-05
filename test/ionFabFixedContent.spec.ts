import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionFabFixedContentRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-fab slot="fixed"></ion-fab>\`
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
          <ion-fab></ion-fab>\`
           ~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ion-fab container is no longer fixed by default. Use slot="fixed".',
        source
      });
    });

    it('should fail without slot attribute', () => {
      let source = `
      @Component({
        template: \`
          <ion-fab vertical="top" horizontal="end"></ion-fab>\`
           ~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ion-fab container is no longer fixed by default. Use slot="fixed".',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should add slot="fixed" to ion-fab without attributes', () => {
      let source = `
        @Component({
          template: \`<ion-fab></ion-fab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The ion-fab container is no longer fixed by default. Use slot="fixed".',
        startPosition: {
          line: 2,
          character: 22
        },
        endPosition: {
          line: 2,
          character: 29
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-fab slot="fixed"></ion-fab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should add slot="fixed" to ion-radio without slot', () => {
      let source = `
        @Component({
          template: \`
            <ion-fab vertical="top" horizontal="end"></ion-fab>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The ion-fab container is no longer fixed by default. Use slot="fixed".',
        startPosition: {
          line: 3,
          character: 13
        },
        endPosition: {
          line: 3,
          character: 20
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-fab slot="fixed" vertical="top" horizontal="end"></ion-fab>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
