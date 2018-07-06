import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionColAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper size attribute', () => {
      let source = `
          @Component({
            template: \`<ion-col size="3"></ion-col>\`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with proper offset attribute', () => {
      let source = `
          @Component({
            template: \`<ion-col offset="3"></ion-col>\`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when col-3 is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-col col-3>
                       ~~~~~
              </ion-col>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The col-3 attribute of ion-col has been renamed. Use size="3" instead.',
        source
      });
    });

    it('should fail when col-xs-3 is used', () => {
      let source = `
            @Component({
              template: \`
              <ion-col col-xs-3>
                       ~~~~~~~~
              </ion-col>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The col-xs-3 attribute of ion-col has been renamed. Use size-xs="3" instead.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace col-3 with size="3"', () => {
      let source = `
        @Component({
          template: \`
            <ion-col col-3></ion-col>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The col-3 attribute of ion-col has been renamed. Use size="3" instead.',
        startPosition: {
          line: 3,
          character: 21
        },
        endPosition: {
          line: 3,
          character: 26
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-col size="3"></ion-col>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace col-xs-3 with size-xs="3"', () => {
      let source = `
        @Component({
          template: \`
            <ion-col col-xs-3></ion-col>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The col-xs-3 attribute of ion-col has been renamed. Use size-xs="3" instead.',
        startPosition: {
          line: 3,
          character: 21
        },
        endPosition: {
          line: 3,
          character: 29
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-col size-xs="3"></ion-col>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
