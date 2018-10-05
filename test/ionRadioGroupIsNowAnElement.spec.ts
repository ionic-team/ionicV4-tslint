import { expect } from 'chai';
import { ruleName } from '../src/ionRadioGroupIsNowAnElementRule';
import { assertAnnotated, assertSuccess, assertFailure } from './testHelper';
import { Replacement, Utils } from 'tslint';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-list>
            <ion-radio-group>
              <ion-item>
                <ion-label>Apple</ion-label>
                <ion-radio slot="start" value="apple"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-list>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when radio-group attribute is used on ion-list', () => {
      let source = `
      @Component({
        template: \`
          <ion-list radio-group>
                    ~~~~~~~~~~~
            <ion-item>
              <ion-label>Apple</ion-label>
              <ion-radio value="apple"></ion-radio>
            </ion-item>
          </ion-list>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'radio-group is now an ion-radio-group element instead of an Angular directive.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should create child ion-radio-group element and remove radio-group attribute', () => {
      let source = `
        @Component({
          template: \`<ion-list radio-group></ion-list>
          \`
        })
        class Bar {}
      `;
      const fail = {
        message: 'radio-group is now an ion-radio-group element instead of an Angular directive.',
        startPosition: {
          line: 2,
          character: 31
        },
        endPosition: {
          line: 2,
          character: 42
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-list>
<ion-radio-group></ion-radio-group>
</ion-list>
          \`
        })
        class Bar {}
      `;
      expect(res).to.eq(expected);
    });
  });
});
