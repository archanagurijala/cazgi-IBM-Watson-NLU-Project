import React from 'react';
import './bootstrap.min.css';

class SentimentTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {   
                this.props.sentiments.map((item) => {
                    return <tr><td style={{"color": this.props.color}}>{item[0]}</td><td style={{"color": this.props.color}}>{item[1]}</td></tr>
                })
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default SentimentTable;