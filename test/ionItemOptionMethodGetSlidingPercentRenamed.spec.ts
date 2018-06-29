import { expect } from 'chai';
import { ruleName, ruleMessage } from '../src/ionItemOptionMethodGetSlidingPercentRenamedRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with new method name', () => {
      let source = `
      class DoSomething{
        constructor(){}
        getRatio(item: ItemSliding){
          return item.getSlidingRatio();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when using getSlidingPercent', () => {
      let source = `
      class DoSomething{
        constructor(){}
        getRatio(item: ItemSliding){
          return item.getSlidingPercent();
                      ~~~~~~~~~~~~~~~~~
        }
      }
        `;
      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });
  });
});
