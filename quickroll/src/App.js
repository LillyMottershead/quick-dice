import React from 'react';
import './App.css';
import command from './roll.js';
import Help from './HelpPage.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.aliases) {
            localStorage.setItem('aliases', JSON.stringify({}));
        }
        if (!localStorage.settings) {
            localStorage.setItem('settings', JSON.stringify({critRule: 'rolldouble'}));
        }
        this.state = {
            page: 'roller',
            settings: JSON.parse(localStorage.settings),
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.onSettingsChange = this.onSettingsChange.bind(this);
    }

    onPageClick(e) {
        this.setState({
            page: e.target.name,
        });
    }
    onSettingsChange(e) {
        let settings = this.state.settings;
        settings[e.target.name] = e.target.value;
        this.setState({
            settings: settings,
        });
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    render() {
        let pages = ['roller', 'settings', 'help'];
        function pageButton(name, onPageClick) {
            return (
            <button className='panel input' name={name} onClick={onPageClick}>
                {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
            </button>
            );
        }
        let pageButtons = pages.map(x => pageButton(x, this.onPageClick));
        return (
            <div>
                <h1 style={{ padding: '10px' }}> quickroll </h1>
                <span style={{ padding: '10px' }}>
                    {pageButtons}
                </span>
                <Main show={this.state.page === 'roller'} settings={this.state.settings}/>
                <Settings show={this.state.page === 'settings'} settings={this.state.settings} onSettingsChange={this.onSettingsChange}/>
                <Help show={this.state.page === 'help'}/>
            </div>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rollCommand: '',
            times: '',
            output: { calls: [], currKey: 0},
            aliases: JSON.parse(localStorage.aliases || '{ }'),
            log: { components: [], currKey: 0 },
        };
    
        this.textInputRef = React.createRef();
    
        this.onRollFormChange = this.onRollFormChange.bind(this);
        this.onLogClear = this.onLogClear.bind(this);
        this.hideCall = this.hideCall.bind(this);
        this.handleCommand = this.handleCommand.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onRollFormChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value, });
    }
    
    onLogClear(e) {
        e.preventDefault();
        this.setState({ log: { components: [], currKey: 0 } });
    }
    
    hideCall(index) {
        this.setState((state) => {
            state.output.calls[index] = null;
            return {output: state.output};
        });
        if (this.state.output.calls.filter(x => x !== null).length === 1) {
            this.setState( { output: { calls: [], currKey: 0 } });
        }
        this.textInputRef.current.focus();
    }
    
    handleCommand(rollCommand, times) {
        function getRolls(rollCommand, index, log, critRule, hideCall) {
            function pushToLog(log, message) {
                if (log.components.length > 100) {
                    log.components.pop();
                }
                log.components.unshift(<p key={`log#${log.currKey++}`}> {message} </p>);
                log.currKey %= 101;
            }
            let output;
            try {
                output = command(rollCommand, critRule);
                pushToLog(log, output.message);
                if (output.rolls) {
                    output.rolls.forEach(x => {
                        let message;
                        if (x.critString) {
                            message = `${x.fullString}, ${x.critString}, ${x.result} ${x.label}`;
                        } else {
                            message = `${x.fullString} ${x.label}`
                        }
                        pushToLog(log, message);
                    });
                    output = output.rolls.map((x, i) => <Roll key={`roll#${i}`} roll={x} />);
                } else {
                    output = <div className='panel flex-child'> {output.message} </div>;
                }
            } catch (err) {
                pushToLog(log, err.message);
                output = <div className='panel flex-child'> {err.message} </div>;
            }
            return <Call key={`call#${index}`} rolls={output} handleClose={() => hideCall(index)}/>;
        }

        let newOutput = [...new Array(times).keys()].map((x, i) =>
            getRolls(rollCommand, this.state.output.currKey + i, this.state.log, this.props.settings.critRule, this.hideCall)
        );
        this.setState(state => {
            return {
                output: {calls: [...state.output.calls, ...newOutput], currKey: state.output.currKey + newOutput.length},
                aliases: JSON.parse(localStorage.aliases || '{ }'),
                log: state.log,
            }
        });
        this.textInputRef.current.focus();
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.rollCommand === 'clear') {
            this.setState({
                output: {calls: [], currKey: 0},
            });
        } else if (this.state.rollCommand === 'clear log') {
            this.onLogClear(e);
        } else if (this.state.rollCommand !== '') {
            this.handleCommand(this.state.rollCommand, +this.state.times || 1);
        }

        if (this.state.rollCommand !== '') {
            this.setState({
                rollCommand: '',
                times: '',
            });
        }
        this.textInputRef.current.focus();
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className='h-container'>
                <Aliases
                    aliases={this.state.aliases}
                    handleUpload={this.handleUpload}
                    handleCommand={this.handleCommand}
                />
                <div className='v-container flex-fill' style={{ width: '600px' }}>
                    <RollForm
                        rollCommand={this.state.rollCommand}
                        times={this.state.times}
                        onRollFormChange={this.onRollFormChange}
                        onSubmit={this.onSubmit}
                        textInputRef={this.textInputRef}
                        />
                    <div className='flex-fill' style={{ margin: '1em', }}>
                        <div className='h-container' style={{ alignItems: 'center', height: '45vh', overflow: 'auto',}}>
                            {this.state.output.calls.filter((x) => x !== null).reverse()} 
                        </div>
                    </div>
                    <div className='h-container'>
                        <Log 
                            log={this.state.log.components} 
                            onLogClear={this.onLogClear}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

class Settings extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }
        function critRuleRadioButton(value, content, props) {
            return (
                <RadioButton 
                    name='critRule'
                    value={ value } 
                    onChange={ props.onSettingsChange }
                    content={ content }
                    checked={ props.settings.critRule === value }
                />
            );
        }
        return (
            <div>
                <div className='panel' style={{ textAlign: 'left' }}>
                    <h2 style={{ textAlign: 'center'}}> Settings </h2>
                    <h3> Crit Rule </h3>
                    <i style={{ fontSize: '.75em' }}>Note that this only applies to future rolls.</i>
                    <form style={{ paddingTop: '.75em'}}>
                        { critRuleRadioButton('rolldouble', 'Roll double the number of dice.', this.props) }<br />
                        { critRuleRadioButton('doubledice', 'Roll the dice normally and double them.', this.props) }<br />
                        { critRuleRadioButton('addmaxdice', 'Roll the dice normally and add the maximum possible dice roll on top.', this.props) }<br />
                    </form>
                </div>
            </div>
        );
    }
}

function RadioButton(props) {
    return (
        <label className='input-radio-container'>
            <input 
                type='radio'
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                checked={props.checked}
            />
            <span className='input-radio-check'></span>
            {props.content}
        </label>
    );
}

function RollForm(props) {
    return (
        <form style={{ margin: '10px', }}>
            <input
                className='panel input-text'
                type='text'
                ref={props.textInputRef}
                autoFocus
                name='rollCommand'
                value={props.rollCommand}
                placeholder='Command'
                onChange={props.onRollFormChange}
            />
            <input
                className='panel input-text'
                type='text'
                style={{ width: '30px' }}
                name='times'
                value={props.times}
                placeholder='#'
                onChange={props.onRollFormChange}
            />
            <input
                className='panel input'
                type='submit'
                value='>'
                onClick={props.onSubmit}
            />
        </form>
    );
}

function Call(props) {
    return (
        <div
            className='h-container call'
            onClick={props.handleClose}
            style={{ position: 'relative', padding: '1em' }}
        >
            {props.rolls}
            <span className='close-button'>
                <CloseButton color='red'/>
            </span>
        </div>
    );
}

function Roll(props) {
    let res = props.roll.result + (props.roll.critResult || 0);
    let label = props.roll.label || '';
    let fullString = props.roll.fullString || '';
    let critString = props.roll.critString || '';
    let dice = props.roll.dice.map((x, i) => <DieImage key={`rollImage#${i}}`} die={x} />);
    return (
        <div
            className='panel flex-child tooltip'
            style={{ background: '',margin: '-1px', marginBottom: '0px' }}
        >
            {dice}
            <p>
                {res} <span style={{ fontSize: '.75em' }}> {label} </span>
            </p>
            <span className='tooltiptext'>
                {fullString} <br /> {critString}
            </span>
        </div>
    );
}

function DieImage(props) {
    let fileName = process.env.PUBLIC_URL;
    let colorOrGray = props.die.kept ? 'dice/' : 'gray_dice/';
    let sides = props.die.sides;
    let result = props.die.num;
    fileName = `${fileName}/${colorOrGray}d${sides}_${result}.svg`;
    return (
        <img 
            src={fileName} 
            alt={`${result} (d${sides})`} 
            height='50px' 
        />
    );
}

function Aliases(props) {
    let aliases = Object.keys(props.aliases);
    aliases.sort();
    aliases = aliases.map((x, i) => (
        <AliasButton 
            key={`alias#${i}`} 
            aliasName={x}
            handleCommand={props.handleCommand}
        />
    ));
    return (
        <div className='panel flex-child aliases'>
            <label className='h2'> Aliases </label>
            <div> 
                {aliases} 
            </div>
        </div>
    );
}

function AliasButton(props) {
    return (
        <div 
            style={{ margin: '5px', padding: '5px', border: '1px #6b6c75 solid', textAlign: 'left', position: 'relative', }}
        > 
            <div 
                style={{ width: '90%', cursor: 'pointer'}}
                onClick={() => props.handleCommand(props.aliasName, 1)}
            >
                {props.aliasName}
            </div>
            <span 
                style={{ position: 'absolute', right: '5px', top: '5px', cursor: 'pointer'}}
                onClick={() => props.handleCommand(`alias delete ${props.aliasName}`, 1)}
            >
                <CloseButton />
            </span>
        </div>
    );
}

function CloseButton(props) {
    let color = props.color || '#95969e';
    return (
        <svg width='10' height='10'>
            <line x1='0' y1='0' x2='10' y2='10' style={{ stroke: color, strokeWidth: 2}} />
            <line x1='0' y1='10' x2='10' y2='0' style={{ stroke: color, strokeWidth: 2}} />
        </svg>
    );
}

function Log(props) {
    return (
        <div className='panel log'>
            <h2>
                Log
                <button className='panel input' onClick={props.onLogClear}>
                    Clear
                </button>
            </h2>
            <div className='inner-log'>
                {props.log}
            </div>
        </div>
    );
}

export default App;
