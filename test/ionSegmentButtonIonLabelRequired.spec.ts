import { ruleName } from '../src/ionSegmentButtonIonLabelRequiredRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with ion-label child', () => {
      let source = `
      @Component({
        template: \`
          <ion-segment-button>
            <ion-label>Dog</ion-label>
          </ion-segment-button>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-label missing', () => {
      let source = `
      @Component({
        template: \`
          <ion-segment-button>
           ~~~~~~~~~~~~~~~~~~
            Dog
          </ion-segment-button>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ion-segment-button requires an ion-label component. It is no longer automatically added.',
        source
      });
    });

    it('should fail with only text', () => {
      let source = `
      @Component({
        template: \`
          <ion-segment-button>Dog</ion-segment-button>
           ~~~~~~~~~~~~~~~~~~
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The ion-segment-button requires an ion-label component. It is no longer automatically added.',
        source
      });
    });
  });
});
