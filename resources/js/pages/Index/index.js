import React from 'react';
import Banner from './components/Banner';
import Section from './components/Section';
import Pricing from './components/Pricing';

export default () => {

    return (
        <div className="home-page">
            <Banner />
            
            <Section 
                icon="assets"
                title="Assets"
                topTitle="IT CLOUD SEA’S IT SERVICE"
                buttons={[
                    {
                        label: 'Inventory Management',
                        button: 'G-Book',
                    }
                ]}
            />

            <Section 
                icon="accounting"
                title="Accounting"
                buttons={[
                    {
                        label: 'Accounting',
                        button: 'G-Book',
                    }
                ]}
            />

            <Section 
                icon="hr"
                title="HR & Admin"
                buttons={[
                    {
                        label: 'Webmail',
                        button: 'E-office',
                    },
                    {
                        label: 'E-Approval',
                        button: 'E-office',
                    },
                    {
                        label: 'E-Document',
                        button: 'E-office',
                    },
                    {
                        label: 'E-check in.out',
                        button: 'E-office',
                    },
                    {
                        label: 'Co-work/Project',
                        button: 'E-office',
                    },
                ]}
            />

            <Section 
                icon="customer"
                title="Customer"
                buttons={[
                    {
                        label: 'Customer Request Management',
                        button: 'OQUFIE',
                    }
                ]}
            />

            <Section 
                icon="security"
                title="Security"
                buttons={[
                    {
                        label: 'SSL Server',
                        button: 'SECTIGO',
                    }
                ]}
            />

            <Section 
                icon="accounting"
                title="Accounting"
                buttons={[
                    {
                        label: 'Accounting',
                        button: 'G-Book',
                    }
                ]}
            />

            <Pricing />
        </div>
    )
}