module.exports = {    
    moduleNameMapper: {
        '^@/components/ui/dialog$': '<rootDir>/src/components/ui/dialog.tsx',
        '^@/components/ui/button$': '<rootDir>/src/components/ui/button.tsx',
        '^@/components/ui/input$': '<rootDir>/src/components/ui/input.tsx',
        '^@/components/ui/label$': '<rootDir>/src/components/ui/label.tsx',
        '^@/components/ui/tooltip$': '<rootDir>/src/components/ui/tooltip.tsx',
    },
    "setupFilesAfterEnv": [
        "<rootDir>/src/setupTests.ts"
    ]
};