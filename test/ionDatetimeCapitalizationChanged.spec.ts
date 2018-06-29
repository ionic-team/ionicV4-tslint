import { ruleName } from '../src/ionDatetimeCapitalizationChangedRule';
import { assertAnnotated, assertSuccess, assertMultipleAnnotated } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work when the import and path are correct', () => {
      let source = `
      import {Datetime} from '@ionic/angular';
        `;
      assertSuccess(ruleName, source);
    });
  });
  describe('failure', () => {
    it('should fail when symbol is right, but path is wrong', () => {
      let source = `
      import {Datetime} from 'ionic-angular';
                              ~~~~~~~~~~~~~
        `;
      assertAnnotated({
        ruleName,
        source,
        message: 'outdated import path'
      });
    });
    it('should fail when symbol is wrong, but path is right', () => {
      let source = `
      import {DateTime} from '@ionic/angular';
              ~~~~~~~~
        `;
      assertAnnotated({
        ruleName,
        source,
        message: 'imported symbol no longer exists'
      });
    });
    it('should fail when symbol and path are wrong', () => {
      let source = `
      import {DateTime} from 'ionic-angular';
              ~~~~~~~~        ^^^^^^^^^^^^^
        `;
      assertMultipleAnnotated({
        ruleName,
        source,
        failures: [
          {
            char: '~',
            msg: 'imported symbol no longer exists'
          },
          {
            char: '^',
            msg: 'outdated import path'
          }
        ]
      });
    });
  });
});
