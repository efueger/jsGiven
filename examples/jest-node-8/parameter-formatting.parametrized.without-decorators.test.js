import {
    scenario,
    scenarios,
    setupForRspec,
    Stage,
    buildParameterFormatter,
} from 'js-given';

import { sum } from './sum';

setupForRspec(describe, it);

const LoudFormatter = bangCharacter =>
    buildParameterFormatter(text => text.toUpperCase() + `${bangCharacter}`);

class MyStage extends Stage {
    a_value(value) {
        return this;
    }
}
LoudFormatter('!').formatParameter(MyStage, 'a_value', 'value');

scenarios(
    'parameter-formatting-parametrized-without-decorators',
    MyStage,
    ({ given, when, then }) => {
        return {
            parameters_can_be_formatted: scenario({}, () => {
                given().a_value('hello world');
                // Will be converted to
                //   Given a value HELLO WORLD !!!

                when();

                then();
            }),
        };
    }
);
