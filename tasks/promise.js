'use strict';

const _ = require('lodash');
const { Aigle: AigleOld, Bluebird: BluebirdOld } = require('promise-libraries');

module.exports = ({ Aigle, Bluebird }) => {

  let count;

  return {
    'promise:then:same': {
      setup: config => count = config.count,
      aigle: () => {
        let p = new Aigle(resolve => setImmediate(() => resolve(0)));
        _.times(count, () => {
          p = p.then(value => {
            return new Aigle(resolve => setImmediate(() => resolve(++value)));
          });
        });
        return p;
      },
      bluebird: () => {
        let p = new Bluebird(resolve => setImmediate(() => resolve(0)));
        _.times(count, () => {
          p = p.then(value => {
            return new Bluebird(resolve => setImmediate(() => resolve(++value)));
          });
        });
        return p;
      }
    },
    'promise:then:diff': {
      setup: config => count = config.count,
      aigle: () => {
        let p = new Aigle(resolve => setImmediate(() => resolve(0)));
        _.times(count, () => {
          p = p.then(value => {
            return new AigleOld(resolve => setImmediate(() => resolve(++value)));
          });
        });
        return p;
      },
      bluebird: () => {
        let p = new Bluebird(resolve => setImmediate(() => resolve(0)));
        _.times(count, () => {
          p = p.then(value => {
            return new BluebirdOld(resolve => setImmediate(() => resolve(++value)));
          });
        });
        return p;
      }
    }
  };
};
