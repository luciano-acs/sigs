import React from 'react'
import { Document, Page, View } from '@react-pdf/renderer';
import Dashboard from '../pages/Dashboard';

const GenerarPDF = () => {
    <Document>
        <Page size="A4">
            <View>
                <Dashboard />
            </View>
        </Page>
    </Document>
}

export default GenerarPDF