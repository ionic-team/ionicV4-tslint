import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionMenuEventsRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('events should be ionDidClose and ionDidOpen', () => {
      let source = `
      @Component({
        template: \`
        <ion-menu side="start" (ionDidClose)="logEvent($event)" (ionDidOpen)="logEvent($event)">
        </ion-menu>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ionOpen is used', () => {
      let source = `
      @Component({
        template: \`
        <ion-menu side="start" (ionOpen)="logEvent($event)" >
                                ~~~~~~~
        </ion-menu>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ionOpen event of ion-menu has been renamed. Use ionDidOpen instead.',
        source
      });
    });

    it('should fail when ionClose is used', () => {
      let source = `
      @Component({
        template: \`
        <ion-menu side="start" (ionClose)="logEvent($event)" >
                                ~~~~~~~~
        </ion-menu>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ionClose event of ion-menu has been renamed. Use ionDidClose instead.',
        source
      });
    });

    it('should fail when ionClose and ionOpen are used', () => {
      let source = `
      @Component({
        template: \`
        <ion-menu side="start" (ionClose)="logEvent($event)" (ionOpen)="logEvent($event)" >
                                ~~~~~~~~                      ^^^^^^^
        </ion-menu>
        \`
      })
      class Bar{}
          `;

      assertMultipleAnnotated({
        ruleName,
        source,
        failures: [
          {
            char: '~',
            msg: 'The ionClose event of ion-menu has been renamed. Use ionDidClose instead.'
          },
          {
            char: '^',
            msg: 'The ionOpen event of ion-menu has been renamed. Use ionDidOpen instead.'
          }
        ]
      });
    });
  });
  //
  describe('replacements', () => {
    it('should replace ionOpen with ionDidOpen', () => {
      let source = `
        @Component({
          template: \`
            <ion-menu side="start" (ionOpen)="logEvent($event)" >
            </ion-menu>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The ionOpen event of ion-menu has been renamed. Use ionDidOpen instead.',
        startPosition: {
          line: 3,
          character: 36
        },
        endPosition: {
          line: 3,
          character: 43
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-menu side="start" (ionDidOpen)="logEvent($event)" >
            </ion-menu>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace ionClose with ionDidClose', () => {
      let source = `
        @Component({
          template: \`
            <ion-menu side="start" (ionClose)="logEvent($event)" >
            </ion-menu>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The ionClose event of ion-menu has been renamed. Use ionDidClose instead.',
        startPosition: {
          line: 3,
          character: 36
        },
        endPosition: {
          line: 3,
          character: 44
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-menu side="start" (ionDidClose)="logEvent($event)" >
            </ion-menu>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
