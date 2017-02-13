'use strict';

const _ = require('lodash');
const { Aigle: Aigle010, Bluebird: Bluebird346 } = require('promise-libraries');

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
        _.times(count, n => {
          p = p.then(value => {
            if (n % 2 === 0) {
              return new Aigle010(resolve => setImmediate(() => resolve(++value)));
            } else {
              return new Aigle(resolve => setImmediate(() => resolve(++value)));
            }
          });
        });
        return p;
      },
      bluebird: () => {
        let p = new Bluebird(resolve => setImmediate(() => resolve(0)));
        _.times(count, n => {
          p = p.then(value => {
            if (n % 2 === 0) {
              return new Bluebird346(resolve => setImmediate(() => resolve(++value)));
            } else {
              return new Bluebird(resolve => setImmediate(() => resolve(++value)));
            }
          });
        });
        return p;
      }
    }
  };
};
