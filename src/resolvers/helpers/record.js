/* @flow */

import { TypeComposer } from 'graphql-compose';
import { GraphQLNonNull } from 'graphql';

import type {
  GraphQLFieldConfigArgumentMap,
  recordHelperArgsOpts,
} from '../../definition';

export const recordHelperArgs = (
  typeComposer: TypeComposer,
  opts: recordHelperArgsOpts
): GraphQLFieldConfigArgumentMap => {
  if (!(typeComposer instanceof TypeComposer)) {
    throw new Error('First arg for recordHelperArgs() should be instance of TypeComposer.');
  }

  if (!opts || !opts.recordTypeName) {
    throw new Error('You should provide non-empty `recordTypeName` in options.');
  }

  const recordTypeName: string = opts.recordTypeName;
  const recordComposer = typeComposer.getInputTypeComposer().clone(recordTypeName);
  if (opts && opts.removeFields) {
    recordComposer.removeField(opts.removeFields);
  }

  if (opts && opts.requiredFields) {
    recordComposer.makeFieldsRequired(opts.requiredFields);
  }

  return {
    record: {
      name: 'record',
      type: opts.isRequired
        ? new GraphQLNonNull(recordComposer.getType())
        : recordComposer.getType(),
    },
  };
};
