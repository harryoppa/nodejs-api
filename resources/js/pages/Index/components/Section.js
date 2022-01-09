import React, { useRef } from 'react';

export default ({
    icon = 'assets',
    title = '',
    topTitle = null,
    buttons = [{
        label: '',
        button: '',
    }]
}) => {

    const col = useRef(Math.max(4, 12 / buttons.length));

    return (
        <section className="section">
            <div className="container p-0">
                {
                    topTitle && (
                        <div className="section-top">
                            <h2>{topTitle}</h2>
                        </div>
                    )
                }

                <div className="section-content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center justify-content-center">
                                <img src={`/public/images/${icon}.png`} alt=""/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex h-100 px-lg-5 flex-column align-items-center justify-content-center">
                                <h2>{title}</h2>
                                <div className="row justify-content-center">
                                    {
                                        buttons.map((button, index) => (
                                            <div key={index} className={`col-md-${col.current} mb-4`}>
                                                <div className="d-flex flex-column align-items-center justify-content-center">
                                                    <p className="label">{button.label}</p>
                                                    <a className="button">{button.button}</a>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}