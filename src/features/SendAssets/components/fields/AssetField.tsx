import React, { ChangeEvent, Component } from 'react';
import { Field, FieldProps, FormikHandlers } from 'formik';
import { ComboBox } from '@mycrypto/ui';

import { AccountContext, NetworkContext } from '@services/Store';
import { Network } from '@types';
import { translateRaw } from '@translations';

interface OwnProps {
  handleChange: FormikHandlers['handleChange'];
}

type Props = OwnProps;

export default class AssetField extends Component<Props> {
  public isValidAmount = (value: any) => {
    const valid = value >= 0;
    this.setState({ isValidAmount: valid });
    return valid;
  };

  public handleAssetField = (e: ChangeEvent<any>) => {
    // Conduct estimateGas
    // Conduct clearFields
    this.props.handleChange(e);
  };

  // @todo:SEND delete file once we determine how to store assets
  public render() {
    return (
      <div className="SendAssetsForm-amountAsset-asset">
        <label htmlFor="asset">{translateRaw('SEND_ASSETS_AMOUNT_LABEL')}</label>
        <AccountContext.Consumer>
          {({ accounts }) => (
            <NetworkContext.Consumer>
              {({ networks }) => {
                // Networks of all accounts
                const relevantNetworks: string[] = [
                  ...new Set(accounts.map((account) => account.networkId))
                ];

                const assetslist: string[] = [];
                // For each network
                relevantNetworks.map((en) => {
                  // get the Network
                  const network: Network | undefined = networks.find(
                    (networkEntry) => networkEntry.name === en
                  );
                  // and get associated assets
                  if (network) {
                    assetslist.push(...network.assets);
                  }
                });
                return (
                  <Field
                    id={'7'}
                    name="asset"
                    render={({ field }: FieldProps<string>) => (
                      <ComboBox
                        {...field}
                        id={'8'}
                        onChange={this.handleAssetField}
                        value={field.value}
                        items={new Set(assetslist)}
                        className="SendAssetsForm-fieldset-input"
                      />
                    )}
                  />
                );
              }}
            </NetworkContext.Consumer>
          )}
        </AccountContext.Consumer>
      </div>
    );
  }
}
