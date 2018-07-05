import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionIconAttributeIsActiveRemovedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-icon></ion-icon>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail with isActive attribute', () => {
      let source = `
      @Component({
        template: \`
          <ion-icon isActive="true"></ion-icon>\`
                    ~~~~~~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The isActive attribute of ion-icon has been removed.',
        source
      });
    });
  });
});
