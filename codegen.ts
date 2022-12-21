module.exports = {
    schema: [
        {
            'http://localhost:4000/g': {
            },
        },
    ],
    documents: ['./src/**/*.tsx', './src/**/*.ts', './src/Apollo/**/*.graphql'],
    overwrite: true,
    generates: {
        './src/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};
