import { expect } from 'chai';
import { ruleName } from '../src/ionTextIsNowAnElementRule';
import { assertAnnotated, assertMultipleAnnotated, assertSuccess, assertFailure } from './testHelper';
import { Replacement, Utils } from 'tslint';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-text color="secondary">
            <h1>H1: The quick brown fox jumps over the lazy dog</h1>
          </ion-text>

          <ion-text color="primary">
            <h2>H2: The quick brown fox jumps over the lazy dog</h2>
          </ion-text>

          <ion-text color="light">
            <h3>H3: The quick brown fox jumps over the lazy dog</h3>
          </ion-text>

          <p>
            I saw a werewolf with a Chinese menu in his hand.
            Walking through the <ion-text color="danger"><sub>streets</sub></ion-text> of Soho in the rain.
            He <ion-text color="primary"><i>was</i></ion-text> looking for a place called Lee Ho Fook's.
            Gonna get a <ion-text color="secondary"><a>big dish of beef chow mein.</a></ion-text>
          </p>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-text attribute is used on h1', () => {
      let source = `
      @Component({
        template: \`
          <h1 ion-text color="secondary">H1: The quick brown fox jumps over the lazy dog</h1>
              ~~~~~~~~
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-text is now an ion-text element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-text attribute is used on other elements', () => {
      let source = `
      @Component({
        template: \`
          <p>
            I saw a werewolf with a Chinese menu in his hand.
            Walking through the <sub ion-text color="danger">streets</sub> of Soho in the rain.
                                     ~~~~~~~~
            He <i ion-text color="primary">was</i> looking for a place called Lee Ho Fook's.
                  ^^^^^^^^
            Gonna get a <a ion-text color="secondary">big dish of beef chow mein.</a>
                           11111111
          </p>
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
            msg: 'ion-text is now an ion-text element instead of an Angular directive.'
          },
          {
            char: '^',
            msg: 'ion-text is now an ion-text element instead of an Angular directive.'
          },
          {
            char: '1',
            msg: 'ion-text is now an ion-text element instead of an Angular directive.'
          }
        ]
      });
    });
  });

  describe('replacements', () => {
    it('should create parent ion-text and remove attribute', () => {
      let source = `
        @Component({
          template: \`<h1 ion-text></h1>
          \`
        })
        class Bar {}
      `;
      const fail = {
        message: 'ion-text is now an ion-text element instead of an Angular directive.',
        startPosition: {
          line: 2,
          character: 25
        },
        endPosition: {
          line: 2,
          character: 33
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-text>
<h1></h1>
</ion-text>
          \`
        })
        class Bar {}
      `;
      expect(res).to.eq(expected);
    });
  });
});
